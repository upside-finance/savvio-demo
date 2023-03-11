import React, { useState } from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowCheckWinnerModule } from "../app/uiSlice";

import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

import useAnimation from "../assets/hooks/use-animation";
import spinner from "../assets/spinner.json";
import Lottie from "react-lottie-player";

export default function CheckWinnerModule() {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.ui.showCheckWinnerModule);
  const [visibility, setVisibility] = useState(false);

  //animation of the spinner
  const [spinnerSpeed, setSpinnerSpeed] = useState(0);
  const animation = useAnimation("outQuart", 3000, 0);

  // Set visibility after a delay for the slide up animation to be visible. for some reason only works if the "check draw" button is pressed once
  setTimeout(() => setVisibility(true), 100);

  var modalClass = visibility
    ? "z-50 fixed flex-col  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto rounded-2xl p-2 ease-in-out duration-300 translate-y-0 opacity-500 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip border border-green-aqua bg-white shadow-lemon"
    : "z-50 fixed flex-col top-1/2 left-1/2 -translate-x-1/2 m-auto rounded-2xl p-2 ease-in-out duration-300 translate-y-full opacity-0 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip border border-green-aqua bg-white shadow-lemon";

  return ReactDom.createPortal(
    <>
      <div
        onClick={() => {
          setVisibility(false);
          setTimeout(() => dispatch(setShowCheckWinnerModule(false)), 120);
        }}
        className={`z-50 fixed inset-0 bg-black/70 backdrop-blur ease-in-out
        ${active ? "opacity-100" : "hidden"}`}
      />

      <div className={modalClass}>
        <IconContext.Provider
          value={{
            className: "ml-auto mr-5 my-5 text-gray text-2xl ",
          }}
        >
          <div
            onClick={() => {
              setVisibility(false);
              setTimeout(() => dispatch(setShowCheckWinnerModule(false)), 120);
            }}
            className="cursor-pointer"
          >
            <IoClose />
          </div>
        </IconContext.Provider>
        <h3 className="text-green-aqua uppercase text-4xl text-center">
          Check if <br /> you’re a Winner
        </h3>
        <div className="m-5">
          <Lottie
            loop
            play
            speed={spinnerSpeed}
            animationData={spinner}
            className={`h-60 w-auto overfloy-x-clip m-auto py-4 md:py-0 stroke-[0.5px] `}
          />

          <button
            onClick={() =>
              setSpinnerSpeed(spinnerSpeed == 0 ? animation * 100 - 100 : 0)
            }
            className="w-full mx-auto mt-10 px-5 py-2  button-gradient button-gradient-aqua"
          >
            Check now
          </button>

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
