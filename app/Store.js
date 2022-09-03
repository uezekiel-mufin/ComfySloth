import React, { useState } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "../Slices/productSlice";
import cartSlice from "../Slices/cartSlice";
import { createWrapper } from "next-redux-wrapper";
import paymentSlice from "../Slices/paymentSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  productSlice,
  cartSlice,
  paymentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = () =>
  configureStore({
    reducer: persistedReducer,
    debug: true,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
  });
export const wrapper = createWrapper(store);

// export default store;
