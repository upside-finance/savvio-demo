import React from "react";
import Sidebar from "../components/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function Dapp() {
  return (
    <ProSidebarProvider>
      <div className="App overflow-hidden text-left md:text-center bg-green-aqua  pb-56">
        <Sidebar />
      </div>
    </ProSidebarProvider>
  );
}
