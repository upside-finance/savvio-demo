import React from "react";
import ReactDom from "react-dom";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import NumericInput from "react-numeric-input";

import yieldling from "../assets/yieldling.png";

export default function ticketsModule({ open, onClose }) {
  var modalClass = open
    ? "z-10 fixed flex-col inset-1/2 -translate-x-1/2 -translate-y-1/2 m-auto rounded-2xl p-2 ease-in-out duration-300 translate-y-0 opacity-100 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip border border-green bg-blue-dark shadow-green"
    : "z-10 fixed flex-col inset-1/2 -translate-x-1/2 m-auto rounded-2xl p-2 ease-in-out duration-300 translate-y-full opacity-0 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip border border-green bg-blue-dark shadow-green";

  return ReactDom.createPortal(
    <>
      <div
        onClick={() => onClose(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur ease-in-out
        ${open ? "opacity-100" : "hidden"}`}
      />
      <div className={modalClass}>
        <IconContext.Provider
          value={{
            className: "ml-auto mr-5 my-5 text-green text-2xl svg-green",
          }}
        >
          <div onClick={() => onClose(true)} className="cursor-pointer">
            <IoClose />
          </div>
        </IconContext.Provider>
        <h3 className="text-blue text-4xl text-center">
          Claim your tickets now
        </h3>
        <div className="m-12">
          <img
            src={yieldling}
            alt="NFT artwork"
            className="rounded-xl w-48 h-48 m-auto"
          />
          <p className="text-green my-5">Available YLDY (1 YLDY = 1 Ticket)</p>
          <form action="">
            <input
              type="number"
              step=".01"
              placeholder="12.30"
              className="text-xl text-white placeholder:text-slate-700 rounded-lg w-full h-14 p-2 bg-blue-dark border border-green"
            />
            <NumericInput
              type="number"
              step=".01"
              placeholder="12.30"
              className="text-xl text-white placeholder:text-slate-700 rounded-lg w-full h-14 p-2 bg-blue-dark border border-green"
            />
            <div className="w-full mx-auto mt-5 px-5 py-2 text-lg text-center uppercase bg-blue-dark/80 border border-blue rounded text-blue items-center hover:shadow-blue hover:cursor-pointer hover:bg-blue/10 transition-all">
              Claim your tickets
            </div>
          </form>
          <p className="text-sm text-slate-700 my-2">
            Bid will be held in escrow until there is a higher bid or until the
            auction ends
          </p>
        </div>
      </div>
    </>,

    document.getElementById("portal")
  );
}
