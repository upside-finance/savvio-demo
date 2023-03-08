import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleActive } from "../../components/checkWinner/checkWinnerSlice";

import NftModule from "./nftDisplayModule";
import WinnerHistory from "./winnerHistory";

export default function Home() {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.checkWinner.active);
  return (
    <>
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
            <button className="button-aqua md:w-56 h-12 my-2 ">
              Enter Now
            </button>
            <button
              onClick={() => (
                dispatch(toggleActive(true)), console.log(active)
              )}
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
      <section className="section gradient-border z-10 relative rounded rounded-xl my-10 mx-2 md:m-32 shadow-small">
        <div className="mx-5 md:mx-16 my-10 ">
          <h2 className="md:ml-5 text-green-aqua text-3xl">Winner History</h2>
          <WinnerHistory />
        </div>
      </section>
    </>
  );
}
