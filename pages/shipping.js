import React from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";

const Shipping = () => {
  return (
    <Layout title='shipping'>
      <CheckoutWizard activeStep={1} />
      <div className='mx-auto max-w-screen-md min-h-screen p-8'>
        <h3 className='font-semibold '>Shipping Address</h3>
        <form className='flex flex-col min-h-screen gap-4 mt-8 text-2xl font-semibold '>
          <div className='flex flex-col mb-4'>
            <label htmlFor='name'>Full Name</label>
            <input type='text' id='name' />
          </div>

          <div className='flex flex-col mb-4'>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' />
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' />
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor='postalcode'>Postal code</label>
            <input type='text' id='postalcode' />
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor='country'>Country</label>
            <input type='text' id='country' />
          </div>
          <div className='mb-4 flex justify-between'>
            <button className='primary-button '>Next</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Shipping;
