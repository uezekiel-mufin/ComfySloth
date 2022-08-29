import React, { useState } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "../Slices/productSlice";
import cartSlice from "../Slices/cartSlice";
import { createWrapper } from "next-redux-wrapper";
import filterSlice from "../Slices/filterSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  productSlice,
  cartSlice,
  filterSlice,
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
