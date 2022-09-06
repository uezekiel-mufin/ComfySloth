import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

const Unauthorized = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(router);
  const { message } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.back();
    }
  }, [router, session?.user]);

  return (
    <Layout title='unauthorized'>
      <h1 className='text-xl'>Access Denied</h1>
      {message && <div className='mb-4 text-red-500'>{message}</div>}
    </Layout>
  );
};

export default Unauthorized;
