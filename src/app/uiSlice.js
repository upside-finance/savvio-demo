import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    showCheckWinnerModule: false,
    showTicketsModule: false,
    showWithdrawModule: false,
    withdrawModuleNft: "",
  },
  reducers: {
    setShowCheckWinnerModule: (state, action) => {
      state.showCheckWinnerModule = action.payload;
    },
    setShowTicketsModule: (state, action) => {
      state.showTicketsModule = action.payload;
    },
    setShowWithdrawModule: (state, action) => {
      state.showWithdrawModule = action.payload;
    },
    setWithdrawModuleNft: (state, action) => {
      state.withdrawModuleNft = action.payload;
    },
  },
});

export const {
  setShowCheckWinnerModule,
  setShowTicketsModule,
  setShowWithdrawModule,
  setWithdrawModuleNft,
} = uiSlice.actions;

export default uiSlice.reducer;
