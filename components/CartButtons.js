import Link from "next/link";
import React from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

const CartButtons = () => {
  return (
    <div>
      <ul className='flex gap-4 items-center'>
        <li>
          <Link href='/cart'>
            <a className='flex items-center text-2xl md:text-xl'>
              <h4>Cart</h4>
              <span className='text-xl'>
                <FaShoppingCart />
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='/login'>
            <a className='flex items-center text-2xl md:text-xl'>
              <h4>Login</h4>
              <span className='text-xl'>
                <BsPersonPlusFill />
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CartButtons;
