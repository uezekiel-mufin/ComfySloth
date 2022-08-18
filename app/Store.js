import React, { useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Slices/productSlice";

const store = configureStore({
  reducer: {
    productSlice,
  },
});
export default store;
