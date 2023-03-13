import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import nftPrizeGameSlice from "./nftPrizeGameSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    nftPrizeGame: nftPrizeGameSlice,
  },
});
