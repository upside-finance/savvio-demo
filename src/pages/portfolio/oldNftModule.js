import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowCheckWinnerModule,
  setShowWithdrawModule,
  setWithdrawModuleNft,
} from "../../app/uiSlice";

import CheckWinnerModule from "../../components/CheckWinnerModule";
import WithdrawModule from "../../components/WithdrawModule";
import { nftdata } from "./oldLotteries";

export default function OldNftModule() {
  const dispatch = useDispatch();
  const checkWinnerActive = useSelector(
    (state) => state.ui.showCheckWinnerModule
  );

  const withdrawModuleActive = useSelector(
    (state) => state.ui.showWithdrawModule
  );

  const withdrawModuleNft = useSelector((state) => state.ui.withdrawModuleNft);

  return (
    <>
      {checkWinnerActive ? <CheckWinnerModule /> : ""}
      {withdrawModuleActive ? <WithdrawModule /> : ""}
      <div
        className="grid gap-10 md:gap-20 auto-rows-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {nftdata.map((lottery) => (
          <div className="relative z-10 justify-between gradient-border bg-white min-w-max h-auto rounded-xl py-6 shadow-small ">
            <div
              className="relative center mx-auto  bg-cover bg-center w-5/6 h-60 md:h-[15rem] bg-transparent rounded-xl shadow-small"
              style={{ backgroundImage: `url(${lottery.nftimage})` }}
            >
              <div className="absolute m-3 px-4 py-1 bg-white/90 rounded-xl text-grey-dark">
                <p>{lottery.nftname}</p>
              </div>
              <div className="absolute flex items-center w-full justify-between bottom-0 p-3 bg-white/90 rounded-xl ">
                <p className="text-grey-dark">Total Tickets</p>
                <p className="flex text-green-aqua text-end">
                  {lottery.totaltickets != null
                    ? Intl.NumberFormat("en-US", {
                        notation: "compact",
                        maximumFractionDigits: 2,
                      }).format(lottery.totaltickets)
                    : "-"}{" "}
                  Tickets
                </p>
              </div>
            </div>

            <div className=" bottom-0 w-full rounded-b-lg">
              <div className="mx-5 mt-10">
                <div className="flex justify-between mt-2 mb-4 md:mb-6">
                  <p className="text-grey-dark">Your Tickets</p>{" "}
                  <p className="text-green-aqua">
                    {lottery.participanttickets != null
                      ? Intl.NumberFormat("en-US", {
                          notation: "compact",
                          maximumFractionDigits: 2,
                        }).format(lottery.participanttickets)
                      : "-"}
                  </p>
                </div>
              </div>
              <div className=" flex flex-col md:flex-row justify-around mt-5 text-xs">
                <button
                  onClick={() => (
                    dispatch(setShowWithdrawModule(true)),
                    dispatch(setWithdrawModuleNft(lottery.nftimage))
                  )}
                  className="button-aqua gradient-border bg-white hover:border-transparent relative z-20 h-10 m-2"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => dispatch(setShowCheckWinnerModule(true))}
                  className="button-gradient button-gradient-aqua h-10 m-2"
                >
                  Check Draw
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
