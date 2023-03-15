import React, { useEffect } from "react";
import "./App.css";
import "./input.css";

import Navbar from "./components/navbar";
import Portfolio from "./pages/portfolio/Portfolio";

import { useDispatch, useSelector } from "react-redux";
import {
  addGlobalGameData,
  addUserGameData,
  clearUserGameData,
  setGameCounter,
  setNetworkNowSecs,
} from "./app/nftPrizeGameSlice";
import { DATA_FETCHING_FREQ_MS } from "./constants";
import {
  fetchNetworkTimeSecs,
  fetchNftPrizeGameCounter,
  fetchNftPrizeGameGlobalData,
  fetchNftPrizeGameUserData,
} from "./api";

// according to RRD v6.4+
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import SmartSavings from "./pages/smartsavings/SmartSavings";
import Liquidity from "./pages/liquidity/Liquidity";
import Rewards from "./pages/rewards/Rewards";
import Help from "./pages/help/Help";
import Developers from "./pages/developers/Developers";
import SideBar from "./components/SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useWindowWidth } from "@react-hook/window-size";
import Home from "./pages/home/Home";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const AppLayout = () => {
  const width = useWindowWidth();

  // different layout styles for mobile and desktop
  if (width <= 640) {
    return (
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <ProSidebarProvider>
          <SideBar />
        </ProSidebarProvider>
        <div className="bg-white h-full w-full p-5">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <ProSidebarProvider>
          <SideBar />
        </ProSidebarProvider>
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="bg-white h-full w-full p-5">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route exact path="/" element={<Navigate to="/home" replace />} />
      <Route path={"/home"} element={<Home />} />
      <Route path={"/portfolio"} element={<Portfolio />} />
      <Route path={"/smart-savings"} element={<SmartSavings />} />
      <Route path={"/liquidity"} element={<Liquidity />} />
      <Route path={"/rewards"} element={<Rewards />} />
      <Route path={"/developers"} element={<Developers />} />
      <Route path={"/help"} element={<Help />} />
    </Route>
  )
);

export default function App() {
  const { account } = useWallet();
  const dispatch = useDispatch();
  const { gameCounter, globalGameDataTable, userGameDataTable } = useSelector(
    (state) => state.nftPrizeGame
  );

  useEffect(() => console.log(globalGameDataTable), [globalGameDataTable]);

  const fetchSetGlobalGameData = async (gameID) => {
    const networkNowSecs = await fetchNetworkTimeSecs();
    dispatch(setNetworkNowSecs(networkNowSecs));

    const globalGameData = await fetchNftPrizeGameGlobalData(gameID);
    dispatch(
      addGlobalGameData({ gameID: gameID, globalGameData: globalGameData })
    );
  };

  const fetchSetUserGameData = async (gameID, accountAddr) => {
    const userGameData = await fetchNftPrizeGameUserData(accountAddr, gameID);
    dispatch(
      addUserGameData({
        gameID: gameID,
        userGameData: userGameData,
      })
    );
  };

  useEffect(() => {
    let interval;

    (async function () {
      const gameCounter = await fetchNftPrizeGameCounter();
      dispatch(setGameCounter(gameCounter));

      if (gameCounter != "0") {
        const latestGameID = gameCounter - 1;
        await fetchSetGlobalGameData(latestGameID);
        interval = setInterval(
          () => fetchSetGlobalGameData(latestGameID),
          DATA_FETCHING_FREQ_MS
        );
      }
    })();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;

    (async function () {
      if (account?.address != null) {
        if (gameCounter != "0") {
          const latestGameID = gameCounter - 1;
          await fetchSetUserGameData(latestGameID, account.address);
          interval = setInterval(
            () => fetchSetUserGameData(latestGameID, account.address),
            DATA_FETCHING_FREQ_MS
          );
        }
      } else {
        dispatch(clearUserGameData());
      }
    })();

    return () => clearInterval(interval);
  }, [account?.address, gameCounter]);

  return <RouterProvider router={router} />;
}
