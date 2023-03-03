import React from "react";
import NftModule from "../../components/nftDisplayModule";

export default function Home() {
  return (
    <div className="flex flex-col justify-evenly items-center lg:flex-row md:mt-8">
      <div className="max-w-[550px]">
        <h1 className="mt-12 md:mt-none text-grey-dark text-7xl md:text-[5.5rem] leading-[4rem] md:leading-tight">
          No Loss NFT <br />
          <span className="text-gradient-aqua bg-clip-text text-transparent">
            Prize Games
          </span>
        </h1>
        <p className="mt-8 md:mt-14 italic text-2xl md:text-3xl font-thin">
          Win or Not, you never lose your investment - everyones a winner when
          you play with Savvio.
        </p>
        <div className="flex flex-col md:flex-row justify-between mt-12 md:mt-20">
          <button className="button-aqua md:w-56 h-12 my-2">Enter Now</button>
          <button className="button-gradient button-gradient-aqua md:w-56 h-12 my-2">
            Check Draw
          </button>
        </div>
      </div>
      <div className="w-full md:w-[28rem] mt-10 lg:mt-none">
        <NftModule />
      </div>
    </div>
  );
}
