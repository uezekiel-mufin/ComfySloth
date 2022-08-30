import Link from "next/link";
import React from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addShippingAddress } from "../Slices/cartSlice";
import Cookies from "js-cookie";

const Shipping = () => {
  const shippingAdd = useSelector(
    (state) => state.cartSlice.cart.shippingAddress
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formHandler = (data) => {
    console.log(data);
    dispatch(addShippingAddress({ ...data }));
  };

  console.log(shippingAdd);
  return (
    <Layout title='shipping'>
      <CheckoutWizard activeStep={1} />
      <div className='mx-auto max-w-screen-md min-h-screen p-8'>
        <h3 className='font-semibold '>Shipping Address</h3>
        <form
          onSubmit={handleSubmit(formHandler)}
          className='flex flex-col min-h-screen gap-4 mt-8 text-2xl font-semibold '
        >
          <div className='flex flex-col mb-4'>
            <label htmlFor='name'>Full Name</label>
            <input
              type='text'
              id='name'
              {...register("name", {
                required: "Please enter your full name",
              })}
            />
            {errors.name && (
              <p className='text-red-400'>{errors.name.message}</p>
            )}
          </div>

          <div className='flex flex-col mb-4'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              {...register("address", {
                required: "Please enter your address",
              })}
            />
            {errors.address && (
              <p className='text-red-400'>{errors.address.message}</p>
            )}
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              {...register("city", { required: "Please enter your city" })}
            />
            {errors.city && (
              <p className='text-red-400'>{errors.city.message}</p>
            )}
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              id='country'
              {...register("country", {
                required: "Please enter your country",
              })}
            />
            {errors.country && (
              <p className='text-red-400'>{errors.country.message}</p>
            )}
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor='postalcode'>Postal code</label>
            <input
              type='text'
              id='postalcode'
              {...register("postalcode", {
                required: "Please enter postal code",
              })}
            />
            {errors.postalcode && (
              <p className='text-red-400'>{errors.postalcode.message}</p>
            )}
          </div>
          <div className='mb-4 flex justify-between'>
            {/* <Link href='/payment'> */}
            <button className='primary-button ' type='submit'>
              Next
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Shipping;
