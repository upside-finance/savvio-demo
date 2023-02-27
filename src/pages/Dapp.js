import React from "react";
import { useSelector } from "react-redux";
import { selectSidebarItem } from "../components/sidebar/sidebarSlice";

import { sidebarPages } from "../components/sidebar/sidebarPages";

export default function Dapp() {
  const sidebarMenuItem = useSelector(selectSidebarItem);

  return (
    <div className="App flex overflow-hidden text-left md:text-center bg-green-aqua  pb-56">
      <main className="bg-red-200 w-full">
        {sidebarPages.at(sidebarMenuItem).component}
      </main>
    </div>
  );
}
