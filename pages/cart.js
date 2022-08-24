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
        <h3 className='p-10'>
          Shopping cart is empty,{" "}
          <Link href='/products'>
            <a className='text-blue-500 hover:text-red-500 font-semibold'>
              Go Shopping
            </a>
          </Link>
        </h3>
      ) : (
        <div>
          <div className='overflow-scroll lg:overflow-hidden'>
            <CartTable cartItems={cart} />
          </div>
          <div className='flex justify-between px-5 lg:px-28 font-normal mt-4 '>
            <Link href='/products'>
              <a>
                <button className='bg-[#ab7a5f] tracking-widest px-2 md:px-4  py-2 text-white  md:text-xl text-base rounded-md'>
                  Continue Shopping
                </button>
              </a>
            </Link>
            <button className='bg-[#222] tracking-widest px-2 md:px-4  py-2 text-white  md:text-xl text-base rounded-md'>
              Clear Shopping cart
            </button>
          </div>
          <CartSummary cartItems={cart} />
        </div>
      )}
    </Layout>
  );
};

export default Cart;
