import React from 'react';
import { formatPrice } from '../../utils/helpers';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const CartSummary = ({ cartItems }) => {
  const { data: session } = useSession();
  const subTotal = cartItems.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  const shippingFee = cartItems
    .filter((item) => item.shipping === true)
    .reduce((acc, cur) => acc + cur.price * 0.15, 0);

  const orderTotal = subTotal + shippingFee;
  return (
    <div className='flex flex-col mx-8 md:items-end gap-2 mb-28  md:px-28 mt-8 '>
      <div className='shadow-xl border-2 px-2 py-3 md:px-4 md:py-5  md:w-2/5 rounded-lg'>
        <h3 className='text-center font-bold text-sm md:text-xl'>Summary</h3>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-4 my-8'>
            <h4 className='flex justify-between text-md md:text-xl'>
              Subtotal: <span>{formatPrice(subTotal)}</span>
            </h4>
            <h4 className='flex justify-between text-sm md:text-xl'>
              Shipping Fee: <span>{formatPrice(shippingFee)}</span>
            </h4>
          </div>
          <hr />
          <div className='my-5 mb-5 md:my-10 md:mb-10 '>
            <h3 className='flex justify-between font-bold text-sm md:text-xl'>
              Order Total : <span>{formatPrice(orderTotal)}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className='flex justify-stretch mt-4 md:w-2/5 '>
        <Link href={session?.user ? '/shipping' : '/login?redirect=/shipping'}>
          <button className='bg-[#ab7a5f] tracking-widest w-2/5 md:w-full  px-4 py-3 text-white text-xl font-bold capitalize  rounded-md'>
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
