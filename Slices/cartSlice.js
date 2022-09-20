import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  cart: {
    cartItems: Cookies.get("cartItem3444")
      ? JSON.parse(Cookies.get("cartItem3444"))
      : [],
    shippingAddress: Cookies.get("shipping")
      ? JSON.parse(Cookies.get("shipping"))
      : {},
    paymentMethod: Cookies.get("paymentMethod") || null,
  },
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

      Cookies.set("cartItem3444", JSON.stringify(cartItems));
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

    clearShoppingCart: (state) => {
      Cookies.remove("cartItem3444");
      state.cart.cartItems = [];
    },

    addShippingAddress: (state, action) => {
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
      state.cart.paymentMethod = action.payload;
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
