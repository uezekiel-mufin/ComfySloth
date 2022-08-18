import React from "react";

const Newsletter = () => {
  return (
    <div className='pt-20 pb-20 px-20 md:py-60 mx-4 flex flex-col gap-8'>
      <h3 className='text-[#102a42] font-bold  '>
        Join our newsletter and get 20% off
      </h3>
      <div className='grid grid-cols-2'>
        <p className='leading-7 text-base text-[#617d98] text-start pr-8'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
          perferendis consectetur voluptas, ex aliquam consequatur fuga, ipsum
          aliquid distinctio, quam odio illo dolore. Vitae officiis sint
          consequuntur expedita, optio nesciunt.
        </p>
        <form className='w-full flex'>
          <input
            type='text'
            className='border-2 border-solid border-[#222] h-11 border-r-0 w-full'
          />
          <button className='bg-[#ab7a5f] py-2 h-11 px-4 border-2 border-solid border-[#222]'>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
