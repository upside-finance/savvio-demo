import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";

import { IconContext } from "react-icons";
import { GiTwoCoins } from "react-icons/gi";
import {
  IoWalletOutline,
  IoClose,
  IoPersonCircleOutline,
} from "react-icons/io5";

import NavbarItems from "./navbarItems";
import { ReactComponent as SavvioIcon } from "../assets/savvio-icon.svg";

export default function Navbar() {
  //for smaller devices
  const width = useWindowWidth();
  const [menuVis, setMenuVis] = useState(false);
  var menuClass = menuVis
    ? "-z-20 absolute h-max ease-in-out duration-300 translate-y-0 opacity-100 w-full bg-green-aqua border-t-2 border-green-aqua rounded-b-xl pb-5 pl-2 shadow-xl"
    : "-z-20 fixed h-max ease-in-out duration-300 -translate-y-32 opacity-0 w-full bg-white";

  return (
    <>
      <header className=" bg-transparent z-50 relative top-0 h-16 md:h-20">
        <nav className=" m-auto h-full">
          {navbarElement(menuVis, setMenuVis)}
          {/* for smaller devices */}
          {width <= 640 ? (
            <>
              <div className={menuClass}>
                <IconContext.Provider
                  value={{
                    className:
                      "ml-auto mr-5 h-20 text-white text-2xl svg-white",
                  }}
                >
                  <div onClick={() => setMenuVis(false)}>
                    <IoClose />
                  </div>
                </IconContext.Provider>
                <div>
                  <NavbarItems />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </nav>
      </header>
    </>
  );
}

function navbarElement(menuVis, setMenuVis) {
  return (
    <div className=" bg-transparent w-full max-w-screen-2xl m-auto flex justify-between  h-full">
      {/* <Link to="/">
        <IconContext.Provider value={{ size: "2.5rem", color: "#75F2D7" }}>
          <div className="ml-2 flex items-center gap-1 text-gray font-semibold ">
            <IoPersonCircleOutline /> <p className="hidden md:block">Profile</p>
          </div>
        </IconContext.Provider>
      </Link> */}
      <Link to="home">
        <SavvioIcon className="md:hidden h-16 p-2 fill-gray-dark" />
      </Link>
      <IconContext.Provider
        value={{
          className:
            "block  md:hidden mr-2 text-green-aqua text-4xl focus:shadow-aqua focus:cursor-pointer focus:bg-green-aqua transition-all svg-green-aqua",
        }}
      >
        <div className="flex items-center">
          <IoWalletOutline />
          <div onClick={() => setMenuVis(!menuVis)}>
            <GiTwoCoins />
          </div>
        </div>
      </IconContext.Provider>
      <div className="hidden md:flex items-center ">
        <NavbarItems />
        <div className="button-aqua-primary">Connect Wallet</div>
      </div>
    </div>
  );
}
