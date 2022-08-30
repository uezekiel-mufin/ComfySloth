import { useRouter } from "next/router";
import React, { useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";

const Payment = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("");
  const paymentMethod = ["Paypal", "Stripe", "Paystack", "CashOnDelivery"];
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
            <button className='primary-button'>Next</button>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Payment;

Payment.auth = true;
