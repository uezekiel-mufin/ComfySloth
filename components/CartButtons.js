/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { menuState } from "../Slices/productSlice";
import { useRouter } from "next/router";
import { TiArrowSortedDown } from "react-icons/ti";
import { Menu } from "@headlessui/react";
import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils/helpers";
import { setUser, signOut } from "../Slices/cartSlice";
import Cookies from "js-cookie";
import axios from "axios";

const menuList = ["profile", "orderHistory", "Log out"];

const CartButtons = () => {
  const router = useRouter();
  const [cartQuantity, setCartQuantity] = useState();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart.cartItems);
  const user = useSelector((state) => state.cartSlice.user);

  useEffect(() => {
    setCartQuantity(cart.reduce((acc, cur) => acc + +cur.quantity, 0));
  }, [cart]);

  const handleSignOut = async () => {
    router.push("/");
    dispatch(signOut());
    dispatch(menuState());
  };

  const handleMenu = (item) => {
    router.push(`/${item}`);
    dispatch(menuState());
  };
  const handleSignIn = async (credentialResponse) => {
    const user = await createOrGetUser(credentialResponse);
    dispatch(setUser(user));
    const { data } = await axios.post(`/api/google`, { ...user });
    console.log(data);
    // router.back();
    Cookies.set("userProfile", JSON.stringify(user));
  };

  return (
    <div>
      <ul className='flex gap-4 items-center'>
        <li onClick={() => dispatch(menuState())}>
          <Link href='/cart'>
            <a className='flex items-center text-2xl md:text-xl'>
              <h5>Cart</h5>
              <span className='text-xl relative'>
                <FaShoppingCart />
                {cartQuantity >= 1 && (
                  <span className='absolute -top-3 -right-3 flex text-white text-xs bg-[#ab7a5f] rounded-full h-6 w-6 justify-center items-center'>
                    {cartQuantity}
                  </span>
                )}
              </span>
            </a>
          </Link>
        </li>
        <li>
          {user?.userName ? (
            <div className='flex gap-4 items-center'>
              <div className='flex items-center gap-1'>
                <img
                  src={user.picture}
                  alt={user.userName.split("")[1]}
                  className='w-10 h-10 rounded-full flex items-center justify-center'
                />
                <h5>{user.userName.split(" ")[0]}</h5>
                <Menu as='div' className='relative inline-block text-left'>
                  <Menu.Button className='inline-flex w-full justify-center rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 '>
                    <TiArrowSortedDown
                      className=' text-violet-500 hover:text-violet-100 text-2xl'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                  <Menu.Items className='absolute flex flex-col py-3 right-0 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all duration-1000 ease-linear'>
                    {menuList.map((item, index) => (
                      <Menu.Item
                        key={index}
                        className='p-2 hover:bg-gray-200 flex justify-start transition-all duration-300 ease-linear'
                      >
                        <button
                          className='flex justify-start p-2 hover:bg-gray-200 text-blue-500 transition-all duration-300 ease-linear'
                          onClick={
                            item === "Log out"
                              ? () => handleSignOut()
                              : () => handleMenu(item)
                          }
                        >
                          {item}
                        </button>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          ) : (
            <GoogleLogin
              size='medium'
              text='signin'
              shape='circle'
              cancel_on_tap_outside
              auto_select
              useOneTap
              onSuccess={(credentialResponse) => {
                handleSignIn(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default CartButtons;
