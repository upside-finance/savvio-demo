import React from "react";
import { IconContext } from "react-icons";
import { IoWalletOutline, IoMenu } from "react-icons/io5";
import { ReactComponent as Savvio } from "../assets/savvio.svg";
import { ReactComponent as SavvioIcon } from "../assets/savvio-icon.svg";
import NavbarItems from "./navbarItems";

export default function navbar({ toggleMenuVis }) {
  return (
    <div className="w-full max-w-screen-2xl m-auto flex justify-between items-center ">
      <a href="#">
        <Savvio className="logo hidden md:block md:h-24" />
        <SavvioIcon className="logo block md:hidden h-20" />
      </a>

      <IconContext.Provider
        value={{
          className:
            "block lg:hidden mr-6 text-lemon text-4xl focus:shadow-lemon focus:cursor-pointer focus:bg-lemon/10 transition-all svg-lemon",
        }}
      >
        <div className="flex">
          <IoWalletOutline />
          <div onClick={() => toggleMenuVis(true)}>
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
