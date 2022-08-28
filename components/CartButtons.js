/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { menuState } from "../Slices/productSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
const CartButtons = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart.cartItems);

  const cartQuantity = cart.reduce((acc, cur) => acc + +cur.quantity, 0);
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <div>
      <ul className='flex gap-4 items-center'>
        <li onClick={() => dispatch(menuState())}>
          <Link href='/cart'>
            <a className='flex items-center text-2xl md:text-xl'>
              <h4>Cart</h4>
              <span className='text-2xl relative'>
                <FaShoppingCart />
                {cart.length >= 1 && (
                  <span className='absolute -top-3 -right-3 flex text-white text-xs bg-[#ab7a5f] rounded-full h-6 w-6 justify-center items-center'>
                    {cartQuantity}
                  </span>
                )}
              </span>
            </a>
          </Link>
        </li>
        <li onClick={() => dispatch(menuState())}>
          {session?.user ? (
            <div className='flex gap-4 items-center'>
              <div className='flex items-center gap-1'>
                <img
                  src={session?.user.image}
                  alt={session.user.name}
                  className='w-10 h-10 rounded-full'
                />
                <h5>{session?.user.name.split(" ")[0]}</h5>
              </div>
              <button onClick={() => handleSignOut()}>Sign out</button>
            </div>
          ) : (
            <Link href={`/login`}>
              <a
                className='flex items-center text-2xl md:text-xl'
                onClick={() => router.push("/login")}
              >
                <h4>Login</h4>
                <span className='text-xl'>
                  <BsPersonPlusFill />
                </span>
              </a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CartButtons;
