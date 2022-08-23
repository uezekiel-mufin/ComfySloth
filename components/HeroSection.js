import Link from "next/link";
import React from "react";

const HeroSection = ({ title, singleProduct }) => {
  return (
    <div className='bg-[#eaded7] h-32 flex items-center text-3xl font-bold text-[#453227] p-8 w-full'>
      <Link href='/'>
        <a className='text-[#795744]'>Home </a>
      </Link>
      &nbsp;/&nbsp; {singleProduct && <h4>{singleProduct.name}</h4>}
      {title}
    </div>
  );
};

export default HeroSection;
