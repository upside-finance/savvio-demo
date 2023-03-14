/* global BigInt */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowCheckWinnerModule } from "../../app/uiSlice";
import { setShowTicketsModule } from "../../app/uiSlice";
import CheckWinnerModule from "../../components/CheckWinnerModule";
import TicketsModule from "../../components/TicketsModule";

import NftModule from "./nftDisplayModule";
import WinnerHistory from "./winnerHistory";

export default function Home() {
  const dispatch = useDispatch();
  const { gameCounter, globalGameDataTable, networkNowSecs } = useSelector(
    (state) => state.nftPrizeGame
  );
  const checkWinnerActive = useSelector(
    (state) => state.ui.showCheckWinnerModule
  );

  const ticketsModuleActive = useSelector(
    (state) => state.ui.showTicketsModule
  );

  const [isStakingPeriod, setIsStakingPeriod] = useState(false);

  useEffect(() => {
    if (gameCounter != "0") {
      const latestGlobalGameData = globalGameDataTable[gameCounter - 1];
      if (latestGlobalGameData == null) return;

      setIsStakingPeriod(
        BigInt(networkNowSecs) <=
          BigInt(latestGlobalGameData["staking_end_secs"])
      );
    }
  }, [gameCounter, globalGameDataTable, networkNowSecs]);

  return (
    <>
      {ticketsModuleActive ? <TicketsModule /> : ""}
      {checkWinnerActive ? <CheckWinnerModule /> : ""}
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
            <button
              onClick={() => dispatch(setShowTicketsModule(true))}
              className="button-aqua md:w-56 h-12 my-2 "
            >
              Enter Now
            </button>
            <button
              onClick={() => dispatch(setShowCheckWinnerModule(true))}
              className="button-gradient button-gradient-aqua md:w-56 h-12 my-2"
            >
              Check Draw
            </button>
          </div>
        </div>
        <div className="w-full md:w-[28rem] mt-10 lg:mt-none">
          <NftModule />
        </div>
      </section>
      <section className="section gradient-border z-10 relative rounded-xl my-20 mx-auto max-w-screen-xl shadow-small">
        <div className="mx-5 my-10 ">
          <h2 className="md:ml-5 text-green-aqua text-3xl">Winner History</h2>
          <WinnerHistory />
        </div>
      </section>
    </>
  );
}
