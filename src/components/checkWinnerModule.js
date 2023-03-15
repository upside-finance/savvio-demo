import React, { useState } from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowCheckWinnerModule } from "../app/uiSlice";

import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { GridLoader } from "react-spinners";
import nftimage from "../assets/thumb-nft.png";

import useAnimation from "../assets/hooks/use-animation";
import spinner from "../assets/spinner.json";
import fountain from "../assets/coins-fountain.json";
import Lottie from "react-lottie-player";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { claimToken } from "../api";
import { NFT_PRIZE_GAME_MODULE_ADDR } from "../constants";

export default function CheckWinnerModule({ gameID }) {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.ui.showCheckWinnerModule);
  const globalGameDataTable = useSelector(
    (state) => state.nftPrizeGame.globalGameDataTable
  );
  const { account, signAndSubmitTransaction } = useWallet();
  const [visibility, setVisibility] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorScreen, setErrorScreen] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const onClose = () => {
    setVisibility(false);
    setTimeout(() => dispatch(setShowCheckWinnerModule(false)), 100);
  };

  const clickClaimNow = async () => {
    setIsLoading(true);

    try {
      const sender = NFT_PRIZE_GAME_MODULE_ADDR;
      const tokenData =
        globalGameDataTable[gameID]["token_id"]["token_data_id"];
      const creator = tokenData["creator"];
      const collection = tokenData["collection"];
      const name = tokenData["name"];
      const property_version =
        globalGameDataTable[gameID]["token_id"]["property_version"];
      await claimToken(
        sender,
        creator,
        collection,
        name,
        property_version,
        signAndSubmitTransaction
      );

      setIsLoading(false);
      setClaimSuccess(true);
    } catch (error) {
      setErrorScreen(true);
      setIsLoading(false);
    }
  };

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
        onClick={onClose}
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
        {isLoading ? (
          <div className="z-100 w-full h-full inset-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-slate-900/70 flex justify-center items-center">
            <GridLoader color={"#FBCFE8"} />
          </div>
        ) : null}
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
          <div onClick={onClose} className="cursor-pointer">
            <IoClose />
          </div>
        </IconContext.Provider>
        {errorScreen ? (
          <div className="flex flex-col justify-center items-center h-3/4 ">
            <h3 className="text-green-aqua uppercase text-3xl text-center">
              Something went wrong!
            </h3>
            <h3 className="text-green-aqua text-xl text-center">
              Please try again
            </h3>
            <div
              onClick={onClose}
              className="z-20 w-max-xs md:w-2/3 ml-0 mt-5 button-aqua gradient-border bg-white hover:border-transparent relative"
            >
              Close
            </div>
          </div>
        ) : claimSuccess ? (
          <div className="flex flex-col justify-center items-center h-3/4 ">
            <h3 className="text-green-aqua uppercase text-4xl text-center">
              Sucessfully <br />
              claimed
            </h3>
            <img
              src={nftimage}
              alt="NFT artwork"
              className="rounded-xl w-60 h-60 m-auto shadow-small"
            />
            <div
              onClick={onClose}
              className="z-20 w-max-xs md:w-2/3 ml-0 mt-5 button-aqua gradient-border bg-white hover:border-transparent relative"
            >
              Close
            </div>
          </div>
        ) : winner == null ? (
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
                onClick={() => {
                  setSpinnerSpeed(
                    spinnerSpeed == 0 ? animation * 100 - 100 : 0
                  );
                  setTimeout(() => {
                    globalGameDataTable[gameID]["winner"] == account.address
                      ? setWinner(true)
                      : setWinner(false);
                  }, 3000);
                }}
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
                onClick={() => {
                  setSpinnerSpeed(
                    spinnerSpeed == 0 ? animation * 100 - 100 : 0
                  );
                  clickClaimNow();
                }}
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
