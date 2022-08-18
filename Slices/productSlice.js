import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenu: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    menuState: (state) => {
      state.isMenu = !state.isMenu;
    },
  },
});

export default productSlice.reducer;
export const { menuState } = productSlice.actions;
