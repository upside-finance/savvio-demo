import React from "react";
import Tilt from "react-parallax-tilt";
import nftbg from "../../assets/nft-bg.png";
import nftimage from "../../assets/thumb-nft.png";

const countDown = 1678193769;

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default function nftDisplayModule() {
  return (
    <div className="relative z-10 justify-between gradient-border bg-white sm:max-w-lg h-96 md:h-[36rem] rounded-lg mx-5 sm:m-auto shadow-small ">
      <div className="absolute z-10 w-full bg-white px-5 mt-3">
        <div className="flex justify-between text-grey-dark ">
          <p className="text-2xl">Tinies #017</p>
          <p className="text-lg">@Artistname</p>
        </div>
      </div>
      <div
        className="absolute w-full bg-white rounded-t-lg"
        style={{ transform: "translateZ(0)" }}
      >
        <Tilt tiltReverse={true}>
          <div
            className=" center mx-auto my-14 bg-cover bg-center w-10/12 h-60 md:h-[26rem] bg-transparent rounded-lg shadow-small hover:shadow-none"
            style={{ backgroundImage: `url(${nftimage})` }}
          ></div>
        </Tilt>
      </div>

      <div className="absolute bottom-0 bg-white w-full rounded-b-lg">
        <div className="mx-5 mt-2">
          <div className="flex justify-between mt-2 mb-4 md:mb-6">
            <div className="text-left">
              <p className="text-grey-dark">Current Tickets</p>
              <div>
                <p className="text-green-aqua text-xl">1.5 Tickets</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-grey-dark">Ending In</p>
              <div>
                <p className="text-green-aqua text-xl">
                  {" "}
                  {countDown != null ? getReturnValues(countDown) : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
