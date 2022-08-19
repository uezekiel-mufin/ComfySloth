import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const Error = () => {
  return (
    <Layout>
      <section className='flex flex-col gap-2 bg-[#eaded7] justify-center items-center h-screen '>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link href='/'>
          <a className='bg-[#ab7a5f] mt-4 rounded-md px-4 py-2'>Back to home</a>
        </Link>
      </section>
    </Layout>
  );
};

export default Error;
