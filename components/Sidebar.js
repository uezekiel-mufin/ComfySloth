/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import Link from "next/link";

const Sidebar = ({ isMenu, setIsMenu }) => {
  return (
    <aside className='flex flex-col pt-4 gap-8'>
      <div className='flex justify-between w-full p-2 h-16'>
        <a className='pointer'>
          <img src='/logo.svg' alt='Logo' width='175px' height='80px' />
        </a>
        <span
          onClick={() => setIsMenu(!isMenu)}
          className='text-5xl flex font-bold text-[#e66b6b]'
        >
          <FaTimes />
        </span>
      </div>
      <ul className='text-lg'>
        {links.map((link) => (
          <li
            key={link.id}
            className=' text-xl capitalize hover:bg-slate-600 active:bg-slate-700 p-4'
          >
            {link.text}
          </li>
        ))}
        <Link href='/checkout'>
          <li className='mb-4 p-4'>checkout</li>
        </Link>
      </ul>

      <div className='flex justify-center'>
        <CartButtons />
      </div>
    </aside>
  );
};

export default Sidebar;
