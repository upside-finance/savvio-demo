import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";

import { IconContext } from "react-icons";
import {
  IoHome,
  IoWallet,
  IoInformationCircle,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import { HiCode } from "react-icons/hi";
import { FaSwimmingPool, FaTrophy } from "react-icons/fa";

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

export default function Portfolio() {
  let activeClassName = "text-neutral-900 sidebar-link bg-green-aqua";

  //   return (
  //     <>
  //       <div className="absolute text-left mb-5 p-5 w-64 h-full bg-neutral-900">
  //         <NavLink
  //           to="portfolio"
  //           className={({ isActive }) =>
  //             isActive ? activeClassName : "sidebar-link"
  //           }
  //         >
  //           <IconContext.Provider
  //             value={{ size: "1.3rem", className: "icon-context-sidebar" }}
  //           >
  //             <div>
  //               <IoHome />
  //             </div>
  //           </IconContext.Provider>
  //           Portfolio
  //         </NavLink>
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) =>
  //             isActive ? activeClassName : "sidebar-link"
  //           }
  //         >
  //           <IconContext.Provider
  //             value={{ size: "1.3rem", className: "icon-context-sidebar" }}
  //           >
  //             <div>
  //               <IoWallet />
  //             </div>
  //           </IconContext.Provider>
  //           Smart Savings
  //         </NavLink>
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) =>
  //             isActive ? activeClassName : "sidebar-link"
  //           }
  //         >
  //           <IconContext.Provider
  //             value={{ size: "1.3rem", className: "icon-context-sidebar" }}
  //           >
  //             <div>
  //               <FaSwimmingPool />
  //             </div>
  //           </IconContext.Provider>
  //           Liquidity
  //         </NavLink>
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) =>
  //             isActive ? activeClassName : "sidebar-link"
  //           }
  //         >
  //           <IconContext.Provider
  //             value={{ size: "1.3rem", className: "icon-context-sidebar" }}
  //           >
  //             <div>
  //               <FaTrophy />
  //             </div>
  //           </IconContext.Provider>
  //           Rewards
  //         </NavLink>
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) =>
  //             isActive ? activeClassName : "sidebar-link"
  //           }
  //         >
  //           <IconContext.Provider
  //             value={{ size: "1.3rem", className: "icon-context-sidebar" }}
  //           >
  //             <div>
  //               <HiCode />
  //             </div>
  //           </IconContext.Provider>
  //           Developers
  //         </NavLink>
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) =>
  //             isActive ? activeClassName : "sidebar-link"
  //           }
  //         >
  //           <IconContext.Provider
  //             value={{ size: "1.3rem", className: "icon-context-sidebar" }}
  //           >
  //             <div>
  //               <IoInformationCircle />
  //             </div>
  //           </IconContext.Provider>
  //           Help
  //         </NavLink>
  //       </div>
  //     </>
  //   );

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

  return (
    <div className="flex text-left h-screen absolute">
      <Sidebar
        breakPoint="sm"
        rootStyles={{
          position: "relative !important",
        }}
      >
        <Menu>
          <MenuItem
            icon={<IoHome size={"1.3rem"} />}
            component={<Link to="portfolio" />}
          >
            Portfolio
          </MenuItem>
          <MenuItem icon={<IoWallet size={"1.3rem"} />}>Smart Savings</MenuItem>
          <MenuItem icon={<FaSwimmingPool size={"1.3rem"} />}>
            Liquidity
          </MenuItem>
          <MenuItem icon={<FaTrophy size={"1.3rem"} />}>Rewards</MenuItem>
          <MenuItem icon={<HiCode size={"1.3rem"} />}>Developers</MenuItem>
          <MenuItem icon={<IoInformationCircle size={"1.3rem"} />}>
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
