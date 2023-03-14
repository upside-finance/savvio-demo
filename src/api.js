/* global BigInt */
import { NFT_PRIZE_GAME_MODULE_ADDR } from "./constants";
import { convertHexStringtoString, createResourceType } from "./utils";

export const fetchNftPrizeGameGlobalData = async (gameID) => {
  const payload = {
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::view_global_game_data`,
    type_arguments: [],
    arguments: [gameID.toString()],
  };

  const globalGameData = (await window.aptosClient.view(payload))[0];

  const accountAddr = globalGameData["coin_type"]["account_address"];
  const moduleName = convertHexStringtoString(
    globalGameData["coin_type"]["module_name"]
  );
  const structName = convertHexStringtoString(
    globalGameData["coin_type"]["struct_name"]
  );
  const coinResource = createResourceType(accountAddr, moduleName, structName);
  const coinMetadata = await fetchCoinMetadata(accountAddr, coinResource);

  globalGameData["coin_type"] = {
    account_address: accountAddr,
    module_name: moduleName,
    struct_name: structName,
    type: coinResource,
    ...coinMetadata["data"],
  };

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

const fetchCoinMetadata = async (accountAddr, coinResource) => {
  const coinMetadata = await window.aptosClient.getAccountResource(
    accountAddr,
    `${accountAddr}::coin::CoinInfo<${coinResource}>`
  );

  return coinMetadata;
};
