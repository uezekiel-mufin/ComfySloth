import React from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cartSlice.cart.cartItems);
  console.log(cart);
  return <Layout title='cart'>This is the cart</Layout>;
};

export default Cart;
