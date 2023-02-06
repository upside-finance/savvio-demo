import React from "react";
import ReactDom from "react-dom";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

import { ReactComponent as Yicon } from "../assets/yicon.svg";

export default function checkWinnerModule({ open, onClose }) {
  var modalClass = open
    ? "z-10 fixed flex-col inset-1/2 -translate-x-1/2 -translate-y-1/2 m-auto rounded-2xl p-2 ease-in-out duration-300 translate-y-0 opacity-100 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip border border-pink bg-blue-dark shadow-pink"
    : "z-10 fixed flex-col inset-1/2 -translate-x-1/2 m-auto rounded-2xl p-2 ease-in-out duration-300 translate-y-full opacity-0 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip border border-pink bg-blue-dark shadow-pink";

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
            className: "ml-auto mr-5 my-5 text-pink text-2xl svg-pink",
          }}
        >
          <div onClick={() => onClose(true)} className="cursor-pointer">
            <IoClose />
          </div>
        </IconContext.Provider>
        <h3 className="text-blue text-4xl text-center">
          See if you’re a Winner
        </h3>
        <div className="m-5">
          <Yicon
            className={`h-80 w-auto py-4 md:py-0 stroke-[0.5px] blinking`}
          />

          <div className="w-full mx-auto mt-10 px-5 py-2 text-lg text-center uppercase bg-blue-dark/80 border border-blue rounded text-blue items-center hover:shadow-blue hover:cursor-pointer hover:bg-blue/10 transition-all">
            Claim now
          </div>

          <p className="text-sm text-slate-700 my-2">
            If the light turns out, better luck next time! <br /> If your light
            turns gold you're a winner, congratulations!
          </p>
        </div>
      </div>
    </>,

    document.getElementById("portal")
  );
}
