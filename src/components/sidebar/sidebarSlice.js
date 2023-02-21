import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebarMenuItem",

  //value corresponds to sidebar menu item
  initialState: {
    value: 0,
  },
  reducers: {
    //sets value to whatever sidebar menu item is pressed
    sidebarValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { sidebarValue } = sidebarSlice.actions;
export const selectSidebarItem = (state) => state.sidebarMenuItem.value;

export default sidebarSlice.reducer;
