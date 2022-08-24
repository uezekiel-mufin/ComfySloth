import React, { useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  cart: { cartItems: [], shippingAddress: {} },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItem = state.cart.cartItems.find(
        (item) => item.id === action.payload.id
      );
      state.cart.cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === action.payload.name ? action.payload : item
          )
        : [...state.cart.cartItems, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    quantityUpdate: (state, action) => {
      const item = state.cart.cartItems.find(
        (product) => product.id === action.payload.id
      );
      item.quantity = action.payload.quantity;
    },
    clearShoppingCart: (state, action) => {
      state.cart.cartItems = [];
      state.cart.shippingAddress = {};
    },

    // extraReducers: (builder) => {
    //   builder.addCase(clearShoppingCart, (state, action) => {
    //     state.cart.cartItems = [];
    //   });
    // },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  quantityUpdate,
  deleteItem,
  clearShoppingCart,
} = cartSlice.actions;
