import { configureStore } from "@reduxjs/toolkit";
import checkWinnerReducer from "../components/checkWinner/checkWinnerSlice";

export default configureStore({
  reducer: {
    checkWinner: checkWinnerReducer,
  },
});
