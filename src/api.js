/* global BigInt */
import { NFT_PRIZE_GAME_MODULE_ADDR } from "./constants";

export const fetchNftPrizeGameGlobalData = async (gameID) => {
  const payload = {
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::view_global_game_data`,
    type_arguments: [],
    arguments: [gameID.toString()],
  };

  const globalGameData = (await window.aptosClient.view(payload))[0];
  return globalGameData;
};

export const fetchNftPrizeGameCounter = async () => {
  const payload = {
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::view_game_counter`,
    type_arguments: [],
    arguments: [],
  };

  const gameCounter = (await window.aptosClient.view(payload))[0];
  return gameCounter;
};

export const fetchNetworkTimeSecs = async () => {
  const payload = {
    function: `0x1::timestamp::now_seconds`,
    type_arguments: [],
    arguments: [],
  };

  const nowSecs = (await window.aptosClient.view(payload))[0];
  return nowSecs;
};
