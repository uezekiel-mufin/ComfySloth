import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import { fetchOrderHistory } from "../Slices/paymentSlice";
import moment from "moment";
import { formatPrice } from "../utils/helpers";
import Link from "next/link";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const orderHistory = useSelector((state) => state.paymentSlice.orderHistory);
  console.log(orderHistory);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <Layout title='order history'>
      <HeroSection title='order-history' />
      <div className='mx-4 md:mx-16 my-8 overflow-auto'>
        <h3 className='font-bold'>Order History</h3>

        <table className='min-w-full mt-8 '>
          <thead className='border-b-2'>
            <tr className='text-xl font-semibold'>
              <td className='p-5 mb-2'>ID</td>
              <td className='p-5 mb-2'>Date</td>
              <td className='p-5 mb-2'>Total</td>
              <td className='p-5 mb-2'>Paid</td>
              <td className='p-5 mb-2'>Delivered</td>
              <td className='p-5 mb-2'>Actions</td>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order._id} className='border-b'>
                <td className='p-5 mb-3'>{order._id.substring(0, 10)}</td>
                <td className='p-5 mb-3'>
                  {moment(order.createdAt).format("YY-Do-MM")}
                </td>
                <td className='p-5 mb-3 tracking-widest'>
                  {formatPrice(order.total)}
                </td>
                <td className='p-5 mb-3'>
                  {order.isPaid ? (
                    <h6 className='text-green-500 font-semibold text-2xl'>
                      paid
                    </h6>
                  ) : (
                    <h6 className='text-red-500 font-semibold text-xl'>
                      not paid
                    </h6>
                  )}
                </td>
                <td className='p-5 mb-3'>
                  {order.isDelivered ? (
                    <h6 className='text-green-500 font-semibold text-2xl'>
                      delivered
                    </h6>
                  ) : (
                    <h6 className='text-red-500 font-semibold text-xl'>
                      not delivered
                    </h6>
                  )}
                </td>
                <td className='p-5 mb-3'>
                  <Link href={`/order/${order._id}`}>
                    <a className='text-blue-500 hover:text-red-500'>Details</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrderHistory;

OrderHistory.auth = true;
