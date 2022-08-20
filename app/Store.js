import React, { useState } from "react";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Slices/productSlice";
import cartSlice from "../Slices/cartSlice";
// import { createWrapper, HYDRATE } from "next-redux-wrapper";

// const masterReducer = (state, action)=>{
//   if (action.type === HYDRATE){
//     const nextState = {
//       ...state
//     }
//   }
// }

const store = configureStore({
  reducer: {
    productSlice,
    cartSlice,
  },
});

// export const wrapper = createWrapper(store);
export default store;
