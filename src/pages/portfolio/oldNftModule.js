import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowCheckWinnerModule,
  setShowWithdrawModule,
  setWithdrawModuleNft,
} from "../../app/uiSlice";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import CheckWinnerModule from "../../components/CheckWinnerModule";
import WithdrawModule from "../../components/WithdrawModule";
import { nftdata } from "./oldLotteries";

import {
  fetchNftPrizeGameGlobalData,
  fetchNftPrizeGameUserData,
} from "../../api";
import {
  addGlobalGameData,
  addUserGameData,
} from "../../app/nftPrizeGameSlice";
import { toSU } from "../../utils";

export default function OldNftModule() {
  const { account } = useWallet();
  const dispatch = useDispatch();
  const [selectedGameID, setSelectedGameID] = useState();
  const checkWinnerActive = useSelector(
    (state) => state.ui.showCheckWinnerModule
  );

  const withdrawModuleActive = useSelector(
    (state) => state.ui.showWithdrawModule
  );

  const [pastGameData, setPastGameData] = useState({});

  const withdrawModuleNft = useSelector((state) => state.ui.withdrawModuleNft);

  const { gameCounter, globalGameDataTable, userGameDataTable } = useSelector(
    (state) => state.nftPrizeGame
  );

  const fetchSetGlobalGameData = async (gameID) => {
    const globalGameData = await fetchNftPrizeGameGlobalData(gameID);
    dispatch(
      addGlobalGameData({ gameID: gameID, globalGameData: globalGameData })
    );
  };

  const fetchSetUserGameData = async (gameID, accountAddr) => {
    const userGameData = await fetchNftPrizeGameUserData(accountAddr, gameID);
    dispatch(
      addUserGameData({
        gameID: gameID,
        userGameData: userGameData,
      })
    );
  };

  useEffect(() => {
    if (account?.address != null) {
      if (gameCounter != "0") {
        const latestGameID = gameCounter - 1;

        for (let i = 0; i < latestGameID; i++) {
          fetchSetUserGameData(i, account.address);
          fetchSetGlobalGameData(i);
        }
      }
    }
  }, [account?.address, gameCounter]);

  useEffect(() => {
    const oldGlobalGameDataTable = Object.fromEntries(
      Object.entries(globalGameDataTable).filter(
        ([k, v]) => k != gameCounter - 1
      )
    );
    const oldUserGameDataTable = Object.fromEntries(
      Object.entries(userGameDataTable).filter(([k, v]) => k != gameCounter - 1)
    );
    const oldGameDataTable = {};

    for (const key in oldUserGameDataTable) {
      const oldGameData = {
        gameID: key,
        nftname:
          oldGlobalGameDataTable?.[key]?.["token_id"]["token_data_id"]["name"],
        totalStake: oldGlobalGameDataTable?.[key]?.["total_stake"],
        userStake: oldUserGameDataTable?.[key]?.["user_balance"],
        decimals: oldGlobalGameDataTable?.[key]?.["coin_type"]["decimals"],
      };

      oldGameDataTable[key] = oldGameData;
    }

    setPastGameData(oldGameDataTable);
  }, [globalGameDataTable, userGameDataTable, gameCounter]);

  return (
    <>
      {checkWinnerActive ? <CheckWinnerModule gameID={selectedGameID} /> : ""}
      {withdrawModuleActive ? <WithdrawModule gameID={selectedGameID} /> : ""}
      <div
        className="grid gap-10 md:gap-20 auto-rows-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {Object.entries(pastGameData).map(([k, lottery]) => (
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
                  {lottery.userStake != null && lottery.decimals != null
                    ? Intl.NumberFormat("en-US", {
                        notation: "compact",
                        maximumFractionDigits: 2,
                      }).format(toSU(lottery.totalStake, lottery.decimals))
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
                    {lottery.userStake != null && lottery.decimals != null
                      ? Intl.NumberFormat("en-US", {
                          notation: "compact",
                          maximumFractionDigits: 2,
                        }).format(toSU(lottery.userStake, lottery.decimals))
                      : "-"}
                  </p>
                </div>
              </div>
              <div className=" flex flex-col md:flex-row justify-around mt-5 text-xs">
                <button
                  onClick={() => (
                    setSelectedGameID(lottery.gameID),
                    dispatch(setShowWithdrawModule(true)),
                    dispatch(setWithdrawModuleNft(lottery.nftimage))
                  )}
                  className="button-aqua gradient-border bg-white hover:border-transparent relative z-20 h-10 m-2"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => (
                    setSelectedGameID(lottery.gameID),
                    dispatch(setShowCheckWinnerModule(true))
                  )}
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
