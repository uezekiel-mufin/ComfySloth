import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { formatPrice } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchOrder, paymentMade } from "../../Slices/paymentSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../../utils/error";
import { stripeSession } from "../../Slices/paymentSlice";
import { useState } from "react";

const OrderId = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, status } = router.query;
  const order = useSelector((state) => state.paymentSlice.order);
  const loading = useSelector((state) => state.paymentSlice.loading);
  const sessionId = useSelector((state) => state.paymentSlice.stripeSessionId);
  const {
    orderItems,
    paymentMethod,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrize,
    isPaid,
    isDelivered,
  } = order;

  useEffect(() => {
    if (status !== undefined) {
      if (status === "success") {
        dispatch(paymentMade());
        toast.success("Your payment was successful");
      }
      if (status === "cancel") {
        toast.error(getError(status.message));
      }
    }
  }, [dispatch, isPaid, status]);

  console.log(sessionId);

  console.log(order);

  const total = itemsPrice + taxPrize + shippingPrice;

  useEffect(() => {
    try {
      dispatch(fetchOrder(id));
    } catch (error) {
      toast.error(getError(error));
    }
  }, [dispatch, id]);

  if (loading) {
    return <h4>Loading.............</h4>;
  }

  const paymentData = { orderItems, id };
  const makePayment = async () => {
    try {
      dispatch(stripeSession(paymentData));
      console.log(order);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title={`order ${id}`}>
      <ToastContainer position='bottom-center' limit={1} />
      <div className='mx-24 my-8'>
        <h4>Order {id}</h4>
        <main className='grid grid-cols-4 mt-4  gap-8'>
          <section className='col-span-3 '>
            <div className='card mb-4 p-6 '>
              <h4>Shipping Address</h4>
              <div className='text-xl my-2'>
                {shippingAddress?.name}, {shippingAddress?.address},{" "}
                {shippingAddress?.city}, {shippingAddress?.country},{" "}
                {shippingAddress?.postalcode}
              </div>
              <h5
                className='text-blue-500 w-full text-xl font-semibold'
                onClick={() => router.push("/shipping")}
              >
                {isDelivered ? (
                  <div className='alert-success'>delivered</div>
                ) : (
                  <div className='alert-error'>not delivered</div>
                )}
              </h5>
            </div>
            <div className='card mb-4 p-5'>
              <h4>Payment Method</h4>
              <div className='text-xl my-2'>{paymentMethod}</div>
              <h5
                className='text-blue-500 text-xl font-semibold'
                onClick={() => router.push("/payment")}
              >
                {isPaid ? (
                  <div className='alert-success'>paid</div>
                ) : (
                  <div className='alert-error'>not paid</div>
                )}
              </h5>
            </div>
            <div className='card mb-4 p-3'>
              <h4 className='p-5'>Order Items</h4>
              <table className='min-w-full mx-auto'>
                <thead className='border-b'>
                  <tr className='font-bold text-2xl'>
                    <td className='p-5 text-left flex gap-4'>Item</td>
                    <td className='text-center p-3'>Quantity</td>
                    <td className='text-center p-3'>Price</td>
                    <td className='text-center p-3'>Subtotal</td>
                  </tr>
                </thead>

                <tbody>
                  {orderItems?.map((item) => (
                    <tr key={item._id} className='border-b text-xl font-normal'>
                      <td className='p-5 text-left flex gap-4 '>
                        <div className='flex items-center gap-2'>
                          <div className='h-20 w-20'>
                            <Link href={`/products/${item.id}`}>
                              <a className='flex flex-1'>
                                <Image
                                  src={item.images[0].url}
                                  alt={item.name}
                                  height='200px'
                                  width='200px'
                                  layout='intrinsic'
                                  className='rounded-md'
                                />
                              </a>
                            </Link>
                          </div>
                          <p className='text-blue-500 capitalize '>
                            {item.name}
                          </p>
                        </div>
                      </td>

                      <td className='text-center p-3'>{item.quantity}</td>
                      <td className='text-center p-3 tracking-widest'>
                        {formatPrice(item.price)}
                      </td>
                      <td className='text-center p-3 tracking-widest'>
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className='col-span-1 '>
            <section className='card mb-4 p-5 '>
              <h4 className='my-4 font-bold text-center'>Order Summary</h4>
              <div className='mb-4 text-xl font-normal flex justify-between'>
                <span>Items</span>
                <span>{formatPrice(itemsPrice)}</span>
              </div>
              <div className='mb-4 text-xl font-normal flex justify-between'>
                <span>Tax</span>
                <span className='tracking-widest'>{formatPrice(taxPrize)}</span>
              </div>
              <div className='mb-4 text-xl font-normal flex justify-between'>
                <span>Shipping</span>
                <span className='tracking-widest'>
                  {formatPrice(shippingPrice)}
                </span>
              </div>
              <hr />
              <div className='mb-4 mt-4 text-xl font-semibold flex justify-between'>
                <span>Total</span>
                <span className='tracking-widest'>{formatPrice(total)}</span>
              </div>
              <button
                className='primary-button w-full mb-4 text-xl'
                onClick={makePayment}
                disabled={isPaid}
              >
                {isPaid ? "Thank You" : `pay with ${paymentMethod}`}
              </button>
            </section>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default OrderId;

OrderId.auth = true;
