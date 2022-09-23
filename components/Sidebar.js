/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { menuState } from "../Slices/productSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className='flex flex-col pt-4 gap-8'>
      <div className='flex justify-between w-full p-2 h-16'>
        <a className='pointer'>
          <img src='/logo.svg' alt='Logo' width='175px' height='80px' />
        </a>
        <span
          onClick={() => dispatch(menuState())}
          className='text-5xl flex font-bold text-[#e66b6b]'
        >
          <FaTimes />
        </span>
      </div>
      <ul className='text-lg'>
        {links.map((link) => (
          <li
            onClick={() => dispatch(menuState())}
            key={link.id}
            className=' text-xl capitalize hover:bg-slate-600 active:bg-slate-700 p-4'
          >
            <Link href={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>

      <div className='flex justify-center'>
        <CartButtons />
      </div>
    </aside>
  );
};

export default Sidebar;
