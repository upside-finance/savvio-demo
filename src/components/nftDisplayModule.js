import React from "react";
import Tilt from "react-parallax-tilt";
import nftbg from "../assets/nft-bg.png";
import yieldling from "../assets/yieldling.png";

export default function nftDisplayModule() {
  return (
    <div
      className="relative justify-between bg-cover max-w-lg h-[39rem] rounded-2xl mx-5 sm:m-auto"
      style={{ backgroundImage: `url(${nftbg})` }}
    >
      <div className="absolute w-full" style={{ transform: "translateZ(0)" }}>
        <Tilt tiltReverse={true}>
          <div
            className=" center mx-auto my-16 bg-cover bg-center w-3/4 md:w-2/3 h-96 bg-pink rounded-lg"
            style={{ backgroundImage: `url(${yieldling})` }}
          ></div>
        </Tilt>
      </div>

      <div className="absolute bottom-0 backdrop-blur-md bg-[#2E404040] rounded-b-2xl">
        <div className="mx-5 mt-3">
          <div className="flex justify-between text-blue text-xl">
            <p>Yieldling Original #013</p>
            <p>@Artistname</p>
          </div>
          <p className="mt-4 text-white text-left">
            Hatching 1 at a time. 500 Flamingo Flock. All Yieldlings are 1 of 1s
            excluding the 'Originals' and 'Yields'. There are no vaulted
            Yieldlings.
          </p>
          <div className="flex justify-between mt-12 mb-7">
            <div className="text-left">
              <p className="text-white">Current Tickets</p>
              <div>
                <p className="text-blue text-xl">1.5 Tickets</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-white">Ending In</p>
              <div>
                <p className="text-blue text-xl">8h 14m 24s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
