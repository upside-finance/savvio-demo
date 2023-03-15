import { createSlice } from "@reduxjs/toolkit";

export const nftPrizeGameSlice = createSlice({
  name: "nftPrizeGameSlice",
  initialState: {
    gameCounter: "0",
    globalGameDataTable: {},
    userGameDataTable: {},
    networkNowSecs: null,
  },
  reducers: {
    setGameCounter: (state, action) => {
      state.gameCounter = action.payload;
    },
    addGlobalGameData: (state, action) => {
      const gameID = action.payload.gameID;
      const globalGameData = action.payload.globalGameData;
      state.globalGameDataTable = {
        ...state.globalGameDataTable,
        [gameID]: globalGameData,
      };
    },
    addUserGameData: (state, action) => {
      const gameID = action.payload.gameID;
      const userGameData = action.payload.userGameData;
      state.userGameDataTable = {
        ...state.userGameDataTable,
        [gameID]: userGameData,
      };
    },
    clearUserGameData: (state, payload) => {
      state.userGameDataTable = {};
    },
    setNetworkNowSecs: (state, action) => {
      state.networkNowSecs = action.payload;
    },
  },
});

export const {
  setGameCounter,
  addGlobalGameData,
  setNetworkNowSecs,
  addUserGameData,
  clearUserGameData,
} = nftPrizeGameSlice.actions;
export default nftPrizeGameSlice.reducer;
