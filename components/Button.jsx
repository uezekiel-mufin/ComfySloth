import React from "react";

const Button = ({ title, onClick, py, px }) => {
  return (
    <button
      className={`px-${px} py-${py} relative rounded group font-medium text-white text-center inline-block`}
      onClick={onClick}
    >
      <span className='absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-[#dfbba9] to-[#ab7a5f]'></span>
      <span className='h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#dfbba9] to-[#ab7a5f]'></span>
      <span className='absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#dfbba9] to-[#ab7a5f]'></span>
      <span className='absolute inset-0 w-full h-full transition duration-200 ease-out rounded -gradient-to-br to-purple-600 from-blue-500'></span>
      <span className='relative text-center text-white'>{title}</span>
    </button>
  );
};

export default Button;
