import React from "react";
import "./App.css";
import "./input.css";

import Navbar from "./components/Navbar";
import Portfolio from "./pages/portfolio/Portfolio";

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

const AppLayout = () => {
  const width = useWindowWidth();

  // different layout styles for mobile and desktop
  if (width <= 640) {
    return (
      <div className="flex flex-col w-full">
        <Navbar />
        <ProSidebarProvider>
          <SideBar />
        </ProSidebarProvider>
        <Outlet />
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
          <Outlet />
        </div>
      </div>
    );
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route exact path="/" element={<Navigate to="/portfolio" replace />} />

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
  return <RouterProvider router={router} />;
}
