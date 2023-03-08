import { createSlice } from "@reduxjs/toolkit";

export const checkWinnerSlice = createSlice({
  name: "checkWinner",
  initialState: {
    active: false,
  },
  reducers: {
    toggleActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { toggleActive } = checkWinnerSlice.actions;

export default checkWinnerSlice.reducer;
