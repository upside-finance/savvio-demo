import React, { useState } from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowCheckWinnerModule } from "../app/uiSlice";

import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

import useAnimation from "../assets/hooks/use-animation";
import spinner from "../assets/spinner.json";
import fountain from "../assets/coins-fountain.json";
import Lottie from "react-lottie-player";

export default function CheckWinnerModule() {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.ui.showCheckWinnerModule);
  const [visibility, setVisibility] = useState(false);
  const [winner, setWinner] = useState(true);

  //animation of the spinner
  const [spinnerSpeed, setSpinnerSpeed] = useState(0);
  const animation = useAnimation("outQuart", 3000, 0);

  // Set visibility after a delay for the slide up animation to be visible. for some reason only works if the "check draw" button is pressed once
  setTimeout(() => setVisibility(true), 100);

  //modal exit transition seems to work only sometimes
  var modalClass = visibility
    ? "z-50 fixed flex-col inset-y-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto rounded-lg p-2 ease-in-out duration-300 translate-y-0 opacity-500 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-clip lg:overflow-clip shadow-lemon "
    : "z-50 fixed flex-col inset-y-1/2 left-1/2 -translate-x-1/2 m-auto rounded-lg p-2 ease-in-out duration-300 translate-y-1/2 opacity-0 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-clip lg:overflow-clip shadow-lemon ";

  return ReactDom.createPortal(
    <>
      <div
        onClick={() => {
          setVisibility(false);
          setTimeout(() => dispatch(setShowCheckWinnerModule(false)), 100);
        }}
        className={`z-50 fixed inset-0 bg-black/70 backdrop-blur ease-in-out
        ${active ? "opacity-100" : "hidden"}`}
      />

      <div
        className={
          modalClass +
          (winner == null
            ? "animated-gradient-border bg-white"
            : winner
            ? "gradient-aqua"
            : "bg-white")
        }
      >
        <Lottie
          loop
          play={winner}
          animationData={fountain}
          rendererSettings={{ preserveAspectRatio: "none" }}
          className={`absolute -z-10 inset-0 h-full ${winner ? "" : "blur-lg"}`}
        />
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
        {winner == null ? (
          <div className="h-[90%] flex flex-col">
            <h3 className="text-green-aqua uppercase text-4xl text-center">
              Check if <br /> you’re a Winner
            </h3>
            <div className="m-5">
              <Lottie
                loop
                play
                speed={spinnerSpeed}
                animationData={spinner}
                className={`h-72 w-auto overfloy-x-clip m-auto py-4 md:py-0 stroke-[0.5px] `}
              />

              <button
                onClick={() =>
                  setSpinnerSpeed(spinnerSpeed == 0 ? animation * 100 - 100 : 0)
                }
                className="w-full mx-auto mt-10 px-5 py-2 button-gradient button-gradient-aqua"
              >
                Check now
              </button>

              <p className="text-sm text-slate-700 my-2">
                Bid will be held in escrow until there is a higher bid or until
                the auction ends
              </p>
            </div>
          </div>
        ) : winner ? (
          <div className="h-[90%] flex flex-col">
            <h3
              className="my-auto text-white text-5xl text-center leading-[5rem]"
              style={{ textShadow: "3px 3px 10px #70E4CB" }}
            >
              Congratulations <br /> <span className="text-6xl">You’re a </span>
              <br /> <span className="text-7xl uppercase">Winner!</span>
            </h3>
            <div className="my-10 mx-5">
              <button
                onClick={() =>
                  setSpinnerSpeed(spinnerSpeed == 0 ? animation * 100 - 100 : 0)
                }
                className="w-full mx-auto mt-10 px-5 py-2 bg-white button-aqua"
              >
                Claim now
              </button>

              <p className="text-sm text-slate-700 my-2">
                Bid will be held in escrow until there is a higher bid or until
                the auction ends
              </p>
            </div>
          </div>
        ) : (
          <div className="h-[90%] flex flex-col">
            <h3
              className="my-auto text-green-aqua text-8xl text-center leading-[5rem]"
              style={{ textShadow: "3px 3px 30px #70E4CB" }}
            >
              Sorry <br /> <span className="text-6xl">Better luck </span>
              <br /> <span className="text-6xl ">next time</span>
            </h3>
            <div className="my-10 mx-5">
              <button className="w-full mx-auto mt-10 px-5 py-2 bg-white shadow-md shadow-gray-300 rounded text-gray-300 cursor-default">
                Claim now
              </button>

              <p className="text-sm text-gray-300 my-2">
                Bid will be held in escrow until there is a higher bid or until
                the auction ends
              </p>
            </div>
          </div>
        )}
      </div>
    </>,

    document.getElementById("portal")
  );
}
