import { NFT_PRIZE_GAME_MODULE_ADDR, NODE_URL } from "./constants";
import { convertHexStringtoString, createResourceType } from "./utils";
import { AptosClient } from "aptos";

const aptosClient = new AptosClient(NODE_URL);

export const fetchNftPrizeGameGlobalData = async (gameID) => {
  const payload = {
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::view_global_game_data`,
    type_arguments: [],
    arguments: [gameID.toString()],
  };

  const globalGameData = (await aptosClient.view(payload))[0];

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

export const fetchNftPrizeGameUserData = async (userAddr, gameID) => {
  const payload = {
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::view_user_game_data`,
    type_arguments: [],
    arguments: [userAddr, gameID.toString()],
  };

  const userGameData = (await aptosClient.view(payload))[0];
  return userGameData;
};

export const fetchNftPrizeGameCounter = async () => {
  const payload = {
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::view_game_counter`,
    type_arguments: [],
    arguments: [],
  };

  const gameCounter = (await aptosClient.view(payload))[0];
  return gameCounter;
};

export const fetchNetworkTimeSecs = async () => {
  const payload = {
    function: `0x1::timestamp::now_seconds`,
    type_arguments: [],
    arguments: [],
  };

  const nowSecs = (await aptosClient.view(payload))[0];
  return nowSecs;
};

const fetchCoinMetadata = async (accountAddr, coinResource) => {
  const coinMetadata = await aptosClient.getAccountResource(
    accountAddr,
    `${accountAddr}::coin::CoinInfo<${coinResource}>`
  );

  return coinMetadata;
};

export const fetchCoinBalance = async (accountAddr, coinResource) => {
  const payload = {
    function: `0x1::coin::balance`,
    type_arguments: [coinResource],
    arguments: [accountAddr],
  };
  try {
    const coinBalance = (await aptosClient.view(payload))[0];
    return coinBalance;
  } catch (e) {
    return 0;
  }
};

export const stake = async (
  coinType,
  gameID,
  amount,
  signAndSubmitTransaction
) => {
  const payload = {
    type: "entry_function_payload",
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::stake`,
    type_arguments: [coinType],
    arguments: [gameID, amount.toString()],
  };

  const response = await signAndSubmitTransaction(payload);
  await aptosClient.waitForTransaction(response.hash);
};

export const unstake = async (
  coinType,
  gameID,
  amount,
  signAndSubmitTransaction
) => {
  const payload = {
    type: "entry_function_payload",
    function: `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::unstake`,
    type_arguments: [coinType],
    arguments: [gameID, amount.toString()],
  };

  const response = await signAndSubmitTransaction(payload);
  await aptosClient.waitForTransaction(response.hash);
};

export const claimToken = async (
  sender,
  creator,
  collection,
  name,
  property_version,
  signAndSubmitTransaction
) => {
  const payload = {
    type: "entry_function_payload",
    function: `0x3::token_transfers::claim_script`,
    type_arguments: [],
    arguments: [sender, creator, collection, name, property_version],
  };

  const response = await signAndSubmitTransaction(payload);
  await aptosClient.waitForTransaction(response.hash);
};

export const fetchWinnerHistory = async (gameID) => {
  const events = await aptosClient.getEventsByEventHandle(
    NFT_PRIZE_GAME_MODULE_ADDR,
    `${NFT_PRIZE_GAME_MODULE_ADDR}::savvio_nft_prize_game::SavvioNftPrizeGameGlobalDataStore`,
    "set_winner_event"
  );

  const eventsData = events.map((v) => v.data);

  return eventsData;
};
