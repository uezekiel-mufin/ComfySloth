import React from "react";
import { formatPrice } from "../../utils/helpers";

const CartSummary = ({ cartItems }) => {
  const subTotal = cartItems.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  const shippingFee = cartItems
    .filter((item) => item.shipping === true)
    .reduce((acc, cur) => acc + cur.price * 0.15, 0);

  const orderTotal = subTotal + shippingFee;
  return (
    <div className='flex flex-col mx-4 md:items-end gap-2 mb-28  md:px-28 mt-8 '>
      <div className='shadow-xl border-2 px-10 py-5 md:w-1/2 rounded-lg'>
        <h3 className='text-center font-bold'>Summary</h3>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-4 my-8'>
            <h4 className='flex justify-between font-bold '>
              Subtotal: <span>{formatPrice(subTotal)}</span>
            </h4>
            <h4 className='flex justify-between'>
              Shipping Fee: <span>{formatPrice(shippingFee)}</span>
            </h4>
          </div>
          <hr />
          <div className=' my-10 mb-10 '>
            <h3 className='flex justify-between font-bold'>
              Order Total : <span>{formatPrice(orderTotal)}</span>
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
