import React, { useEffect } from "react";
import "./App.css";
import "./input.css";

import Navbar from "./components/navbar";
import Portfolio from "./pages/portfolio/Portfolio";

import { useDispatch, useSelector } from "react-redux";
import { addGlobalGameData, setGameCounter } from "./app/nftPrizeGameSlice";
import { AptosClient } from "aptos";
import { NODE_URL, DATA_FETCHING_FREQ_MS } from "./constants";
import { fetchNftPrizeGameCounter, fetchNftPrizeGameGlobalData } from "./api";

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
  const dispatch = useDispatch();
  const globalGameDataTable = useSelector(
    (state) => state.nftPrizeGame.globalGameDataTable
  );

  useEffect(() => console.log(globalGameDataTable), [globalGameDataTable]);

  const fetchSetGlobalGameData = async (gameID) => {
    const globalGameData = await fetchNftPrizeGameGlobalData(gameID);
    dispatch(
      addGlobalGameData({ gameID: gameID, globalGameData: globalGameData })
    );
  };

  useEffect(() => {
    window.aptosClient = new AptosClient(NODE_URL);

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

  return <RouterProvider router={router} />;
}
