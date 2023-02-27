import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { ReactComponent as SavvioIcon } from "../assets/savvio-icon.svg";

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

  //router location
  let location = useLocation();

  //router location to Title Case
  function pathName() {
    return location.pathname
      .substring(1)
      .replace("-", " ")
      .split(" ")
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }

  return (
    <div className="flex text-left md:h-screen  ">
      <Sidebar
        breakPoint="sm"
        rootStyles={
          dimensions.width <= 640
            ? {
                position: "absolute !important",
                backgroundColor: "white",
                // marginTop: "5rem",
              }
            : {}
        }
      >
        <SavvioIcon className="logo block md:hidden h-20 invert hover:drop-shadow-none" />
        <Menu>
          <MenuItem
            icon={<IoHome size={"1.3rem"} />}
            component={<Link to="portfolio" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(0)), toggleSidebar())}
          >
            Portfolio
          </MenuItem>
          <MenuItem
            icon={<IoWallet size={"1.3rem"} />}
            component={<Link to="smart-savings" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(1)), toggleSidebar())}
          >
            Smart Savings
          </MenuItem>
          <MenuItem
            icon={<FaSwimmingPool size={"1.3rem"} />}
            component={<Link to="liquidity" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(2)), toggleSidebar())}
          >
            Liquidity
          </MenuItem>
          <MenuItem
            icon={<FaTrophy size={"1.3rem"} />}
            component={<Link to="rewards" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(3)), toggleSidebar())}
          >
            Rewards
          </MenuItem>
          <MenuItem
            icon={<HiCode size={"1.3rem"} />}
            component={<Link to="developers" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(4)), toggleSidebar())}
          >
            Developers
          </MenuItem>
          <MenuItem
            icon={<IoInformationCircle size={"1.3rem"} />}
            component={<Link to="help" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(5)), toggleSidebar())}
          >
            Help
          </MenuItem>
        </Menu>
      </Sidebar>
      <div
        // className={
        //   dimensions.width <= 640 && !toggled ? "w-screen" : "mt-5 relative"
        // }
        className="w-screen md:w-auto md:mt-5"
      >
        {dimensions.width <= 640 ? (
          <button
            onClick={() => toggleSidebar()}
            className="w-full flex bg-white p-1 rounded-r"
          >
            {toggled ? (
              <IoChevronBack size={"1.3rem"} />
            ) : (
              <IoChevronForward size={"1.3rem"} />
            )}
            <div className="text-left">{pathName()}</div>
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
