import React from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import HeroSection from "../components/HeroSection";
import CartTable from "../components/cart/cartTable";
import CartSummary from "../components/cart/cartSummary";
import Link from "next/link";

const Cart = () => {
  const cart = useSelector((state) => state.cartSlice.cart.cartItems);
  console.log(cart);

  return (
    <Layout title='cart'>
      <HeroSection title='cart' />
      {cart.length < 1 ? (
        <h1>
          Shopping cart is empty,{" "}
          <Link href='/products'>
            <a>Go Shopping</a>
          </Link>
        </h1>
      ) : (
        <div>
          <CartTable cartItems={cart} />
          <div>
            <button>Continue Shopping</button>
            <button>Clear Shopping cart</button>
          </div>
          <CartSummary cartItems={cart} />
          <div>
            <button>login</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
