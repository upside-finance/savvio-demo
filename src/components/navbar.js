import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { IoWalletOutline, IoMenu, IoClose } from "react-icons/io5";
import { ReactComponent as Savvio } from "../assets/savvio.svg";
import { ReactComponent as SavvioIcon } from "../assets/savvio-icon.svg";
import NavbarItems from "./navbarItems";

export default function Navbar() {
  const [menuVis, setMenuVis] = useState(false);
  var menuClass = menuVis
    ? "z-10 absolute h-screen ease-in-out duration-300 translate-x-0 opacity-100 w-full h-full bg-neutral-900  "
    : "z-10 fixed h-screen ease-in-out duration-300 -translate-x-full opacity-0 w-full h-full bg-neutral-900 ";

  return (
    <>
      <header className="bg-[#257df0]/50 backdrop-blur-lg z-50 sticky top-0">
        <nav>
          {navbarElement(menuVis, setMenuVis)}
          <div className={menuClass}>
            <IconContext.Provider
              value={{
                className: "ml-auto mr-5 h-20 text-lemon text-2xl svg-lemon",
              }}
            >
              <div onClick={() => setMenuVis(false)}>
                <IoClose />
              </div>
            </IconContext.Provider>
            <div onClick={() => setMenuVis(false)}>
              <NavbarItems />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

function navbarElement(menuVis, setMenuVis) {
  return (
    <div className="w-full max-w-screen-2xl m-auto flex justify-between items-center ">
      <Link to="/">
        <Savvio className="logo hidden md:block md:h-16" />
        <SavvioIcon className="logo block md:hidden h-20" />
      </Link>

      <IconContext.Provider
        value={{
          className:
            "block lg:hidden mr-6 text-lemon text-4xl focus:shadow-lemon focus:cursor-pointer focus:bg-lemon/10 transition-all svg-lemon",
        }}
      >
        <div className="flex">
          <IoWalletOutline />
          <div onClick={() => setMenuVis(!menuVis)}>
            <IoMenu />
          </div>
        </div>
      </IconContext.Provider>
      <div className="hidden lg:flex items-center ">
        <NavbarItems />
        <div className="hidden lg:flex mx-6 px-5 py-2  transparent border border-lemon rounded font-bold text-lemon items-center hover:shadow-lemon hover:cursor-pointer hover:bg-lemon/10 transition-all">
          Connect Wallet
          <div className="h-5 w-5 m-1 ml-2 p-1 border border-lemon rounded-full ">
            <div className="h-full w-full bg-lemon rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
