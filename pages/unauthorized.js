import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";

const Unauthorized = () => {
  const userProfile = useSelector((state) => state.cartSlice.user);
  const router = useRouter();
  const { message } = router.query;

  useEffect(() => {
    if (userProfile?.email) {
      router.back();
    }

    if (!userProfile.email) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [router, userProfile?.email]);

  return (
    <Layout title='unauthorized'>
      <h1 className='text-xl w-full h-screen flex justify-center items-center text-red-500'>
        Access Denied
      </h1>
      {message && <div className='mb-4 text-red-500'>{message}</div>}
    </Layout>
  );
};

export default Unauthorized;
