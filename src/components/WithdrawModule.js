import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

import nftimage from "../assets/thumb-nft.png";
import { useDispatch, useSelector } from "react-redux";
import { setShowWithdrawModule } from "../app/uiSlice";
import { numOfDP } from "../utils";

export default function WithdrawModule() {
  const [unstakeAmountStr, setUnstakeAmountStr] = useState(null);
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  const checkIfValidInput = () => {
    if (unstakeAmountStr != null) {
      if (unstakeAmountStr <= 0) {
        setInputErrorMsg("Amount must be greater than 0");
        return false;
      }

      //checks if amt entered is greater than wallet balance
      // if (toAU(stakeAmount, stakeToken?.decimals) > userStakeTokenBalance) {
      //   setInputErrorMsg("You do not have enough balance");
      //   return false;
      // }
    }

    //resets error message
    setInputErrorMsg("");
    return true;
  };

  useEffect(() => {
    checkIfValidInput();
  }, [unstakeAmountStr]);

  const dispatch = useDispatch();
  const active = useSelector((state) => state.ui.showWithdrawModule);
  const nft = useSelector((state) => state.ui.withdrawModuleNft);

  const [visibility, setVisibility] = useState(false);

  // Set visibility after a delay for the slide up animation to be visible.
  setTimeout(() => setVisibility(true), 100);

  var modalClass = visibility
    ? "z-50 fixed flex-col inset-y-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto rounded-lg p-2 ease-in-out duration-300 translate-y-0 opacity-500 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip  animated-gradient-border bg-blue-dark shadow-green"
    : "z-50 fixed flex-col inset-y-1/2 left-1/2 -translate-x-1/2 m-auto rounded-lg p-2 ease-in-out duration-300 translate-y-full opacity-0 w-[30rem] max-w-full h-[39rem] max-h-full overflow-x-clip overflow-y-scroll lg:overflow-clip  animated-gradient-border bg-blue-dark shadow-green";

  return ReactDom.createPortal(
    <>
      <div
        onClick={() => {
          setVisibility(false);
          setTimeout(() => dispatch(setShowWithdrawModule(false)), 100);
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
              setTimeout(() => dispatch(setShowWithdrawModule(false)), 100);
            }}
            className="cursor-pointer"
          >
            <IoClose />
          </div>
        </IconContext.Provider>

        <div className="h-[90%] flex flex-col">
          <h3 className="text-green-aqua uppercase text-3xl text-center">
            Withdraw your tokens
          </h3>
          <div className="m-5">
            <img
              src={nft}
              alt="NFT artwork"
              className="object-cover rounded-xl w-60 h-60 m-auto shadow-small "
            />
            <p className="text-green-aqua mt-5 mb-2">
              Available APT (1 APT = 1 Ticket)
            </p>
            <form action="">
              <input
                value={unstakeAmountStr}
                onChange={(e) => {
                  let numStr = e.target.value;
                  const numDP = numOfDP(numStr);
                  // numStr =
                  //   numDP > stakeToken?.decimals
                  //     ? numStr.slice(0, -(numDP - stakeToken?.decimals))
                  //     : numStr;
                  numStr = numStr.replace("-", "");
                  setUnstakeAmountStr(numStr);
                }}
                type="number"
                step=".01"
                min={0}
                placeholder="35.40"
                className="text-xl text-gray-dark placeholder:text-gray-light rounded-lg w-full h-14 p-2 gradient-border shadow-md"
              />
              <div className="text-red-500 text-sm mt-1">{inputErrorMsg}</div>
              <button className="w-full mx-auto mt-5 px-5 py-2 button-gradient button-gradient-aqua">
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
