import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { selectSidebarItem } from "../components/sidebar/sidebarSlice";
import Portfolio from "./portfolio/Portfolio";
import SmartSavings from "./smartsavings/SmartSavings";
import Liquidity from "./liquidity/Liquidity";
import Rewards from "./rewards/Rewards";
import Developers from "./developers/Developers";
import Help from "./help/Help";

export default function Dapp() {
  const sidebarMenuItem = useSelector(selectSidebarItem);
  const componentArray = [
    <Portfolio />,
    <SmartSavings />,
    <Liquidity />,
    <Rewards />,
    <Developers />,
    <Help />,
  ];
  return (
    <ProSidebarProvider>
      <div className="App flex overflow-hidden text-left md:text-center bg-green-aqua  pb-56">
        <SideBar />
        <main className="bg-red-200 w-full">
          {componentArray.at(sidebarMenuItem)}
        </main>
      </div>
    </ProSidebarProvider>
  );
}
