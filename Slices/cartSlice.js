import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  cart: {
    cartItems: Cookies.get("cartItem3444")
      ? JSON.parse(Cookies.get("cartItem3444"))
      : [],
    shippingAddress: Cookies.get("shipping")
      ? JSON.parse(Cookies.get("shipping"))
      : {},
    paymentMethod: Cookies.get("paymentMethod") || "",
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const existItem = state.cart.cartItems.find(
        (item) => item.id === action.payload.id
      );
      console.log(action.payload);

      state.cart.cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === action.payload.name ? action.payload : item
          )
        : [...state.cart.cartItems, action.payload];

      const cartItems = state.cart.cartItems.map((item) => ({
        category: item.category,
        colors: item.colors,
        company: item.company,
        description: item.description,
        id: item.id,
        images: item.images.map((image) => ({
          id: image.id,
          height: image.height,
          filename: image.filename,
          size: image.size,
          url: image.url,
          width: image.width,
        })),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        reviews: item.reviews,
        selectedColor: item.selectedColor,
        shipping: item.shipping,
        stars: item.stars,
        stock: item.stock,
      }));

      Cookies.set("cartItem3444", JSON.stringify([...cartItems]));
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

    addShippingAddress: (state, action) => {
      console.log(action.payload);
      const { name, address, city, postalcode, country } = action.payload;
      state.cart.shippingAddress = {
        name,
        address,
        city,
        postalcode,
        country,
      };
      Cookies.set(
        "shipping",
        JSON.stringify({ name, address, city, postalcode, country })
      );
    },
    setPaymentMethod: (state, action) => {
      console.log(action.payload);
      Cookies.set("paymentMethod", action.payload);
      state.cart.PaymentMethod = action.payload;
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
  addShippingAddress,
  setPaymentMethod,
} = cartSlice.actions;
