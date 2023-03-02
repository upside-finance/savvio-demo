import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";
import { useWindowWidth } from "@react-hook/window-size";

import {
  IoHome,
  IoWallet,
  IoInformationCircle,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import { HiCode } from "react-icons/hi";
import { FaSwimmingPool, FaTrophy } from "react-icons/fa";
import { ReactComponent as Savvio } from "../assets/savvio.svg";
import { ReactComponent as SavvioIcon } from "../assets/savvio-icon.svg";

export default function SideBar() {
  const width = useWindowWidth();

  const {
    toggled,
    toggleSidebar,
    collapseSidebar,
    defaultCollapsed,
    collapsed,
  } = useProSidebar();

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
    <div
      onMouseEnter={() => collapseSidebar(false)}
      onMouseLeave={() => collapseSidebar(true)}
      className="flex text-left uppercase "
    >
      <Sidebar
        defaultCollapsed
        breakPoint="sm"
        rootStyles={
          width <= 640
            ? {
                position: "absolute !important",

                [`.${sidebarClasses.container}`]: {
                  backgroundColor: "#FFFFFF",
                  width: `${toggled ? "280px" : "-100px"}`,
                },
                // [`.${sidebarClasses.broken} .${sidebarClasses.collapsed}`]: {
                //   left: "250px !important",
                // },
                // marginTop: "5rem",
              }
            : {
                [`.${sidebarClasses.container}`]: {
                  backgroundColor: "#FFFFFF",
                  padding: "0px 10px",
                },
                width: "280px",
                minWidth: "104px !important",
              }
        }
      >
        <Savvio
          className="mt-5 ml-3  block hover:drop-shadow-none h-[64px]"
          style={{ fill: "#2F3130" }}
        />

        <Menu
          rootStyles={{
            [`.${menuClasses.button}`]: {
              color: "#75F2D7",
              margin: "8px 0px",
              borderRadius: "10px",
              "&:hover": {
                color: "white",
                backgroundColor: "#75F2D7",
                boxShadow: "2px 4px 20px #0000001A",
              },
            },
            [`.${menuClasses.menuItemRoot}`]: {
              padding: `${width <= 640 ? "0 1rem" : ""}`,
            },

            marginTop: "1rem",
          }}
        >
          <MenuItem
            icon={<IoHome size={"1.8rem"} />}
            component={<Link to="portfolio" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(0)), toggleSidebar())}
          >
            Portfolio
          </MenuItem>
          <MenuItem
            icon={<IoWallet size={"1.8rem"} />}
            component={<Link to="smart-savings" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(1)), toggleSidebar())}
          >
            Smart Savings
          </MenuItem>
          <MenuItem
            icon={<FaSwimmingPool size={"1.8rem"} />}
            component={<Link to="liquidity" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(2)), toggleSidebar())}
          >
            Liquidity
          </MenuItem>
          <MenuItem
            icon={<FaTrophy size={"1.8rem"} />}
            component={<Link to="rewards" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(3)), toggleSidebar())}
          >
            Rewards
          </MenuItem>
          <MenuItem
            icon={<HiCode size={"1.8rem"} />}
            component={<Link to="developers" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(4)), toggleSidebar())}
          >
            Developers
          </MenuItem>
          <MenuItem
            icon={<IoInformationCircle size={"1.8rem"} />}
            component={<Link to="help" />}
            // eslint-disable-next-line
            onClick={() => (dispatch(sidebarValue(5)), toggleSidebar())}
          >
            Help
          </MenuItem>
        </Menu>
      </Sidebar>

      {width <= 640 ? (
        <button
          onClick={() => toggleSidebar()}
          className="w-screen md:w-auto md:mt-5 w-full flex bg-white p-1 rounded-r"
        >
          {toggled ? (
            <IoChevronBack size={"1.3rem"} />
          ) : (
            <IoChevronForward size={"1.3rem"} />
          )}
          <div className="text-left">{pathName()}</div>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
