import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import {
  IoHome,
  IoWallet,
  IoInformationCircle,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import { HiCode } from "react-icons/hi";
import { FaSwimmingPool, FaTrophy } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { sidebarValue } from "./sidebarSlice";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default function SideBar() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  const { toggled, toggleSidebar, collapseSidebar, collapsed } =
    useProSidebar();

  //redux
  const dispatch = useDispatch();

  return (
    <div className="flex text-left h-screen absolute md:relative">
      <Sidebar breakPoint="sm">
        <Menu>
          <MenuItem
            icon={<IoHome size={"1.3rem"} />}
            component={<Link to="portfolio" />}
            onClick={() => dispatch(sidebarValue(0))}
          >
            Portfolio
          </MenuItem>
          <MenuItem
            icon={<IoWallet size={"1.3rem"} />}
            onClick={() => dispatch(sidebarValue(1))}
          >
            Smart Savings
          </MenuItem>
          <MenuItem
            icon={<FaSwimmingPool size={"1.3rem"} />}
            onClick={() => dispatch(sidebarValue(2))}
          >
            Liquidity
          </MenuItem>
          <MenuItem
            icon={<FaTrophy size={"1.3rem"} />}
            onClick={() => dispatch(sidebarValue(3))}
          >
            Rewards
          </MenuItem>
          <MenuItem
            icon={<HiCode size={"1.3rem"} />}
            onClick={() => dispatch(sidebarValue(4))}
          >
            Developers
          </MenuItem>
          <MenuItem
            icon={<IoInformationCircle size={"1.3rem"} />}
            onClick={() => dispatch(sidebarValue(5))}
          >
            Help
          </MenuItem>
        </Menu>
      </Sidebar>
      <div
        className={
          "mt-5 " +
          (dimensions.width <= 640 && !toggled ? "absolute" : "relative")
        }
      >
        {dimensions.width <= 640 ? (
          <button
            onClick={() => toggleSidebar()}
            className=" bg-white p-1 rounded-r"
          >
            {toggled ? (
              <IoChevronBack size={"1.3rem"} />
            ) : (
              <IoChevronForward size={"1.3rem"} />
            )}
          </button>
        ) : (
          <button
            onClick={() => collapseSidebar()}
            className=" bg-white p-1 rounded-r"
          >
            {collapsed ? (
              <IoChevronForward size={"1.3rem"} />
            ) : (
              <IoChevronBack size={"1.3rem"} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
