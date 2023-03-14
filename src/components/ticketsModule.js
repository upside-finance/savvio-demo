/* global BigInt */
import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import NumericInput from "react-numeric-input";

import nftimage from "../assets/thumb-nft.png";
import { useDispatch, useSelector } from "react-redux";
import { setShowTicketsModule } from "../app/uiSlice";
import { numOfDP, toAU, toSU } from "../utils";

import { fetchCoinBalance } from "../api";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function TicketsModule({ gameID }) {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.ui.showTicketsModule);
  const globalGameDataTable = useSelector(
    (state) => state.nftPrizeGame.globalGameDataTable
  );
  const { account } = useWallet();
  const [userCoinBal, setUserCoinBal] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakeAmountStr, setStakeAmountStr] = useState(null);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [decimals, setDecimals] = useState(0);

  const checkIfValidInput = () => {
    if (stakeAmount != null) {
      if (stakeAmount <= 0) {
        setInputErrorMsg("Amount must be greater than 0");
        return false;
      }

      //checks if amt entered is greater than wallet balance
      if (toAU(stakeAmount, decimals) > BigInt(userCoinBal)) {
        setInputErrorMsg("You do not have enough balance");
        return false;
      }
    }

    //resets error message
    setInputErrorMsg("");
    return true;
  };

  useEffect(() => {
    const newStakeAmount =
      stakeAmountStr != null && stakeAmountStr != ""
        ? Number(stakeAmountStr)
        : null;
    setStakeAmount(newStakeAmount);
  }, [stakeAmountStr]);

  useEffect(() => {
    checkIfValidInput();
  }, [stakeAmount]);

  useEffect(() => {
    const latestGlobalGameData = globalGameDataTable[gameID];
    if (latestGlobalGameData == null) return;

    setDecimals(latestGlobalGameData["coin_type"]["decimals"]);

    fetchCoinBalance(
      account.address,
      latestGlobalGameData["coin_type"]["type"]
    ).then((v) => {
      setUserCoinBal(v);
      // Set visibility after a delay for the slide up animation to be visible.
      setVisibility(true);
    });
  }, [globalGameDataTable]);

  var modalClass = visibility
    ? "z-50 fixed flex-col inset-y-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto rounded-lg p-2 ease-in-out duration-300 translate-y-0 opacity-500 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip  animated-gradient-border bg-blue-dark shadow-green"
    : "z-50 fixed flex-col inset-y-1/2 left-1/2 -translate-x-1/2 m-auto rounded-lg p-2 ease-in-out duration-300 translate-y-full opacity-0 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip  animated-gradient-border bg-blue-dark shadow-green";

  return ReactDom.createPortal(
    <>
      <div
        onClick={() => {
          setVisibility(false);
          setTimeout(() => dispatch(setShowTicketsModule(false)), 100);
        }}
        className={`z-50 fixed inset-0 bg-black/70 backdrop-blur ease-in-out
        ${active ? "opacity-100" : "hidden"}`}
      />
      <div className={modalClass}>
        <IconContext.Provider
          value={{
            className: "ml-auto mr-5 my-5 text-gray text-2xl",
          }}
        >
          <div
            onClick={() => {
              setVisibility(false);
              setTimeout(() => dispatch(setShowTicketsModule(false)), 100);
            }}
            className="cursor-pointer"
          >
            <IoClose />
          </div>
        </IconContext.Provider>

        <div className="h-[90%] flex flex-col">
          <h3 className="text-green-aqua uppercase text-3xl text-center">
            Claim your tickets now
          </h3>
          <div className="m-5">
            <img
              src={nftimage}
              alt="NFT artwork"
              className="rounded-xl w-60 h-60 m-auto shadow-small"
            />
            <p className="text-green-aqua mt-5 mb-2">
              {toSU(userCoinBal, decimals)} Available APT (1 APT = 1 Ticket)
            </p>
            <form action="">
              <input
                value={stakeAmountStr}
                onChange={(e) => {
                  let numStr = e.target.value;
                  const numDP = numOfDP(numStr);
                  numStr =
                    numDP > decimals
                      ? numStr.slice(0, -(numDP - decimals))
                      : numStr;
                  numStr = numStr.replace("-", "");
                  setStakeAmountStr(numStr);
                }}
                type="number"
                step=".01"
                min={0}
                placeholder="35.40"
                className="z-20 w-full h-14 p-2 relative text-xl text-gray-dark placeholder:text-gray-light rounded-lg border-2 border-green-aqua shadow-md"
              />
              <div className="text-red-500 text-sm mt-1">{inputErrorMsg}</div>
              <button className="z-20 w-full ml-0 mt-5 button-aqua gradient-border bg-white hover:border-transparent relative ">
                Claim your tickets
              </button>
            </form>
            <p className="text-sm text-gray my-2">
              Bid will be held in escrow until there is a higher bid or until
              the auction ends
            </p>
          </div>
        </div>
      </div>
    </>,

    document.getElementById("portal")
  );
}
