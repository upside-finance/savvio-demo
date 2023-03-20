/* global BigInt */
import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import nftbg from "../../assets/nft-bg.png";
import nftimage from "../../assets/thumb-nft.png";
import { useSelector } from "react-redux";
import { toSU, truncateAddress, calcNewTickets } from "../../utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default function NftDisplayModule() {
  const { account } = useWallet();
  const {
    gameCounter,
    globalGameDataTable,
    userGameDataTable,
    networkNowSecs,
  } = useSelector((state) => state.nftPrizeGame);

  const [nftDisplayData, setNftDisplayData] = useState({});
  const [tempWalletConnect, setTempWalletConnect] = useState(false);

  useEffect(() => {
    if (gameCounter != "0") {
      const latestGlobalGameData = globalGameDataTable[gameCounter - 1];
      if (latestGlobalGameData == null) return;

      const latestUserGameData = userGameDataTable[gameCounter - 1];

      const decimals = latestGlobalGameData["coin_type"]["decimals"];

      const currNetworkSecs = BigInt(networkNowSecs);
      const stakingEndSecs = BigInt(latestGlobalGameData["staking_end_secs"]);

      const currTickets = BigInt(latestGlobalGameData["total_tickets"]);
      const currBalance = BigInt(latestGlobalGameData["total_stake"]);
      const lastUpdateSecs = BigInt(latestGlobalGameData["last_update_sec"]);
      const latestTotalTickets = toSU(
        calcNewTickets(
          currTickets,
          currBalance,
          currNetworkSecs,
          stakingEndSecs,
          lastUpdateSecs
        ),
        decimals
      );

      let latestUserTickets = null;
      if (latestUserGameData != null) {
        const userCurrTickets = BigInt(latestUserGameData["user_tickets"]);
        const userCurrBalance = BigInt(latestUserGameData["user_balance"]);
        const userLastUpdateSec = BigInt(
          latestUserGameData["user_last_update_sec"]
        );

        latestUserTickets = toSU(
          calcNewTickets(
            userCurrTickets,
            userCurrBalance,
            currNetworkSecs,
            stakingEndSecs,
            userLastUpdateSec
          ),
          decimals
        );
      }

      const newNftDisplayData = {
        name: latestGlobalGameData["token_id"]["token_data_id"].name,
        creator: truncateAddress(
          latestGlobalGameData["token_id"]["token_data_id"].creator
        ),
        totalTickets: latestTotalTickets,
        totalStake: latestGlobalGameData["total_stake"],
        userTickets: latestUserTickets,
        userStake: latestUserGameData?.["user_balance"] ?? 0,
        decimals: decimals,
        countDown: Math.max(
          Number(
            BigInt(latestGlobalGameData["staking_end_secs"]) -
              BigInt(networkNowSecs)
          ) * 1000,
          0
        ),
      };

      setNftDisplayData(newNftDisplayData);
      setTempWalletConnect(account?.address != null);

      const interval = setInterval(() => {
        if (nftDisplayData["countDown"] !== 0) {
          setNftDisplayData((v) => ({
            ...v,
            countDown: Math.max(v["countDown"] - 1000, 0),
          }));
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    gameCounter,
    globalGameDataTable,
    userGameDataTable,
    networkNowSecs,
    account?.address,
  ]);

  return (
    <div className="relative z-10 justify-between gradient-border bg-white sm:max-w-lg h-96 md:h-[36rem] rounded-lg mx-5 sm:m-auto shadow-small ">
      <div className="absolute z-10 w-full bg-white px-5 mt-3">
        <div className="flex justify-between text-grey-dark ">
          <p className="text-2xl">{nftDisplayData.name}</p>
          <p className="text-lg">{nftDisplayData.creator}</p>
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

      <div className="absolute bottom-0 bg-white/80 backdrop-blur w-full rounded-b-lg text-sm">
        <div className="mx-5 mt-2 ">
          <div className="flex justify-between mt-2 mb-1">
            <div className="text-left">
              <p className="text-grey-dark">Total Tickets</p>
              <div>
                <p className="text-green-aqua font-medium text-xl">
                  {nftDisplayData.totalTickets != null
                    ? Intl.NumberFormat("en-US", {
                        notation: "compact",
                        maximumFractionDigits: 2,
                      }).format(nftDisplayData.totalTickets)
                    : null}{" "}
                  Tickets
                </p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-grey-dark">Total Stake</p>
              <div>
                <p className="text-green-aqua font-medium text-xl">
                  {nftDisplayData.totalStake != null
                    ? Intl.NumberFormat("en-US", {
                        notation: "compact",
                        maximumFractionDigits: 2,
                      }).format(
                        toSU(nftDisplayData.totalStake, nftDisplayData.decimals)
                      )
                    : ""}{" "}
                  APT
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-grey-dark">Ending In</p>
            <div>
              <p className="text-green-aqua text-xl ml-2">
                {nftDisplayData.countDown != null
                  ? getReturnValues(nftDisplayData.countDown)
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-green-aqua rounded-b-lg ">
          {tempWalletConnect ? (
            <div className="flex justify-between py-2 px-5">
              <div className="text-left">
                <p className="text-grey-dark">Your Tickets</p>
                <div>
                  <p className="text-white font-medium text-xl">
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 2,
                    }).format(nftDisplayData.userTickets)}{" "}
                    Tickets
                  </p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-grey-dark">Your Stake</p>
                <div>
                  <p className="text-white font-medium text-xl">
                    {nftDisplayData.userStake != null
                      ? Intl.NumberFormat("en-US", {
                          notation: "compact",
                          maximumFractionDigits: 2,
                        }).format(
                          toSU(
                            nftDisplayData.userStake,
                            nftDisplayData.decimals
                          )
                        )
                      : "-"}{" "}
                    APT
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button className="flex m-auto font-bold text-lg text-white py-5">
              Connect Wallet to see your stake
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
