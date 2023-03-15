/* global BigInt */
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowCheckWinnerModule,
  setShowWithdrawModule,
  setShowTicketsModule,
  setWithdrawModuleNft,
} from "../../app/uiSlice";
import CheckWinnerModule from "../../components/CheckWinnerModule";
import TicketsModule from "../../components/TicketsModule";
import WithdrawModule from "../../components/WithdrawModule";
import nftimage from "../../assets/thumb-nft.png";

import NftModule from "./nftDisplayModule";
import WinnerHistory from "./winnerHistory";

export default function Home() {
  const { account } = useWallet();
  const dispatch = useDispatch();
  const { gameCounter, globalGameDataTable, networkNowSecs } = useSelector(
    (state) => state.nftPrizeGame
  );
  const { showCheckWinnerModule, showTicketsModule, showWithdrawModule } =
    useSelector((state) => state.ui);

  const [isWinnerBeingSelected, setIsWinnerBeingSelected] = useState(false);
  const [isStakingPeriod, setIsStakingPeriod] = useState(true);

  useEffect(() => {
    if (gameCounter != "0") {
      const latestGlobalGameData = globalGameDataTable[gameCounter - 1];
      if (latestGlobalGameData == null) return;

      const isStakingPeriod =
        BigInt(networkNowSecs) <=
        BigInt(latestGlobalGameData["staking_end_secs"]);

      setIsWinnerBeingSelected(
        !isStakingPeriod && latestGlobalGameData["winner"] == "0x0"
      );

      setIsStakingPeriod(isStakingPeriod);
    }
  }, [gameCounter, globalGameDataTable, networkNowSecs]);

  const [shortListHeight, setShortListHeight] = useState(true);

  return (
    <>
      {showTicketsModule ? <TicketsModule gameID={gameCounter - 1} /> : ""}
      {showCheckWinnerModule ? (
        <CheckWinnerModule gameID={gameCounter - 1} />
      ) : (
        ""
      )}
      {showWithdrawModule ? <WithdrawModule gameID={gameCounter - 1} /> : ""}
      <section className="section items-center lg:flex-row ">
        <div className="max-w-[550px]">
          <h1 className="mt-12 md:mt-none text-grey-dark text-7xl md:text-[5.5rem] leading-[4rem] md:leading-tight">
            No Loss NFT <br />
            <span className="text-gradient-aqua bg-clip-text text-transparent">
              Prize Games
            </span>
          </h1>
          <p className="mt-8 md:mt-14 italic text-2xl md:text-3xl font-thin">
            Win or Not, you never lose your investment - everyones a winner when
            you play with{" "}
            <span className="text-green-aqua font-medium">Savvio</span>.
          </p>
          <div className="flex flex-col md:flex-row justify-between mt-12 md:mt-16">
            {isStakingPeriod ? (
              <button
                onClick={() =>
                  account?.address != null
                    ? dispatch(setShowTicketsModule(true))
                    : null
                }
                className="button-aqua md:w-56 h-12 my-2 "
              >
                Enter Now
              </button>
            ) : (
              <button
                onClick={() =>
                  account?.address != null && !isWinnerBeingSelected
                    ? dispatch(setShowCheckWinnerModule(true))
                    : null
                }
                className="button-gradient button-gradient-aqua md:w-56 h-12 my-2"
              >
                Check Draw
              </button>
            )}
            <button
              onClick={() =>
                account?.address != null
                  ? (dispatch(setShowWithdrawModule(true)),
                    dispatch(setWithdrawModuleNft(nftimage)))
                  : null
              }
              className="button-gradient button-gradient-aqua md:w-56 h-12 my-2"
            >
              Withdraw
            </button>
          </div>
        </div>
        <div className="w-full md:w-[28rem] mt-10 lg:mt-none">
          <NftModule />
          {isWinnerBeingSelected ? (
            <div className="text-center mt-8 animate-pulse">
              Winner is being selected. Please wait!
            </div>
          ) : null}
        </div>
      </section>
      <section className="section gradient-border z-10 relative rounded-xl pt-2 my-20 mx-auto max-w-screen-xl shadow-small">
        <div
          className={`mx-5 mt-10 mb-24 overflow-clip transition-all ${
            shortListHeight ? "h-[15rem]" : "h-[fit]"
          }`}
        >
          <h2 className="md:ml-5 text-green-aqua text-3xl">Winner History</h2>
          <div className="w-full">
            <WinnerHistory />
          </div>
          <button
            onClick={() => setShortListHeight(!shortListHeight)}
            className="absolute bottom-10 inset-x-[44%] flex justify-around items-center mx-auto mt-8 button-aqua py-1 px-2 "
          >
            View All{" "}
            {shortListHeight ? (
              <IoChevronDown className="ml-4" />
            ) : (
              <IoChevronUp className="ml-4" />
            )}
          </button>
        </div>
      </section>
    </>
  );
}
