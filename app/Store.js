import React, { useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Slices/productSlice";
import cartSlice from "../Slices/cartSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      productSlice,
      cartSlice,
    },
    debug: true,
  });

export const wrapper = createWrapper(store);
// export default store;
