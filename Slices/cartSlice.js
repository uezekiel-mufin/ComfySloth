import React, { useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {} },
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
  },
  //   increaseQty: (state, action) => {
  //     const item = action.payload.product;
  //     const quantity = action.payload.quantity;
  //     const currentItem = state.cart.cartItems.find(
  //       (cartItem) => cartItem.id === item.id
  //     );
  //     currentItem.quantity = quantity;
  //   },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
