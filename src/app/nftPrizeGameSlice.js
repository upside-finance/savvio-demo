import { createSlice } from "@reduxjs/toolkit";

export const nftPrizeGameSlice = createSlice({
  name: "nftPrizeGameSlice",
  initialState: {
    gameCounter: "0",
    globalGameDataTable: {},
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
  },
});

export const { setGameCounter, addGlobalGameData } = nftPrizeGameSlice.actions;
export default nftPrizeGameSlice.reducer;
