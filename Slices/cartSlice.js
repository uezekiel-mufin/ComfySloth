import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  cart: {
    cartItems: [],
  },
  newObj2: Cookies.get("newCart7") ? JSON.parse(Cookies.get("newCart7")) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItem = state.cart.cartItems.find(
        (item) => item.id === action.payload.id
      );
      console.log(action.payload);
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
      return initialState;
    },
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
