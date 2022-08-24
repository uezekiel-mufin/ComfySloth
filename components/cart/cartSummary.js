import React from "react";

const CartSummary = () => {
  return (
    <div className='flex flex-col mx-4 md:items-end gap-2 mb-28  md:px-28 mt-8'>
      <div className='shadow-xl border-2 px-10 py-5 md:w-1/2 '>
        <h3 className='text-center font-bold'>Summary</h3>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-4 my-8'>
            <h4 className='flex justify-between font-bold '>
              Subtotal: <span>total</span>
            </h4>
            <h4 className='flex justify-between'>
              Shipping Fee: <span>total</span>
            </h4>
          </div>
          <hr />
          <div className=' my-10 mb-10 '>
            <h3 className='flex justify-between font-bold'>
              Order Total : <span>total</span>
            </h3>
          </div>
        </div>
      </div>
      <div className='flex justify-stretch mt-4 md:w-1/2 '>
        <button className='bg-[#ab7a5f] tracking-widest w-full  px-4 py-2 text-white text-xl font-bold capitalize  rounded-md'>
          login
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
