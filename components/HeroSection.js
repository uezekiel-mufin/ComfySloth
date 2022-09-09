import Link from "next/link";
import React from "react";

const HeroSection = ({ singleProduct, title }) => {
  return (
    <div className='bg-[#eaded7] h-32 flex items-center md:text-3xl font-bold text-[#453227] p-8 w-full'>
      <Link href='/'>
        <a className='text-[#795744] text-xl'>Home </a>
      </Link>
      &nbsp;/&nbsp;
      <Link href={`/products`}>
        <a>
          <h5 className='text-lg'>{title}</h5>
        </a>
      </Link>
      {singleProduct && <h5> &nbsp;/&nbsp;{singleProduct.name}</h5>}
    </div>
  );
};

export default HeroSection;
