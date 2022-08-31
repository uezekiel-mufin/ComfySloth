import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentMethod } from "../Slices/cartSlice";
import Cookies from "js-cookie";

const Payment = () => {
  const router = useRouter();
  const shippingAddress = useSelector(
    (state) => state.cartSlice.cart.shippingAddress
  );
  const payment = useSelector((state) => state.cartSlice.cart.paymentMethod);
  const dispatch = useDispatch();
  console.log(shippingAddress);
  console.log(payment);
  const [selectedPayment, setSelectedPayment] = useState(payment);
  const paymentMethod = ["Paypal", "Stripe", "Paystack", "CashOnDelivery"];

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
  }, [router, shippingAddress.address]);

  const handleSubmit = () => {
    dispatch(setPaymentMethod(selectedPayment));
  };

  console.log(Cookies.get("paymentMethod"));
  return (
    <div>
      <Layout title='payment method'>
        <CheckoutWizard activeStep={2} />
        <main className='mx-auto max-w-screen-md min-h-screen p-16 '>
          <h3 className='font-bold'>Payment Method</h3>
          <ul className='mt-8'>
            {paymentMethod.map((method) => (
              <li
                key={method}
                className=' flex gap-4 mb-2 text-2xl items-center font-semibold'
              >
                <input
                  type='radio'
                  checked={selectedPayment === method}
                  id={method}
                  className='p-2 outline-none focus:ring-0 w-5 h-5 '
                  onChange={() => setSelectedPayment(method)}
                />
                <label htmlFor={method}>{method}</label>
              </li>
            ))}
          </ul>
          <div className='flex justify-between mt-8 p-4 text-2xl font-semibold'>
            <button
              onClick={() => router.push("/shipping")}
              type='button'
              className='default-button'
            >
              back
            </button>
            <button onClick={() => handleSubmit()} className='primary-button'>
              Next
            </button>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Payment;

Payment.auth = true;
