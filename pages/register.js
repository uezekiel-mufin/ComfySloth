import Head from "next/head";
import Link from "next/link";
import React from "react";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { getError } from "../utils/error";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "../components/Layout";

const LoginScreen = () => {
  console.log(useSession());
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/cart");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const formHandler = async ({ name, email, password }) => {
    console.log(email, password, name);
    console.log(session);

    try {
      await axios.post(`/api/auth/signup`, {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
    console.log(session);
  };

  return (
    <Layout>
      <Head>
        <title>Create Account</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ToastContainer position='bottom-center' />
      <div className='flex min-h-screen justify-between flex-col'>
        <main className='  mt-4 px-4 '>
          <form
            className='mx-auto max-w-screen'
            onSubmit={handleSubmit(formHandler)}
          >
            <h1 className='mb-4 text-xl '>Create Account</h1>
            <div className='mb-4'>
              <label htmlFor='name'>Full name</label>
              <input
                type='text'
                id='name'
                autoFocus
                className='w-full'
                {...register("name", {
                  required: "Please enter full name",
                })}
              />
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='w-full'
                {...register("email", {
                  required: "Please enter email address",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full'
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "password should be more than 5 chars",
                  },
                })}
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password'>confirmPassword</label>
              <input
                type='password'
                id='confirmPassword'
                className='w-full'
                {...register("confirmPassword", {
                  required: "Please enter your password",
                  validate: (value) => value === getValues("password"),
                  minLength: {
                    value: 6,
                    message: "password should be more than 5 chars",
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className='text-red-500'>{errors.confirmPassword.message}</p>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <div className='text-red-500'>Pasword do not match</div>
                )}
            </div>
            <div className='mb-4'>
              <button className='primary-button'>create</button>
            </div>
            <div className='mb-4'>
              Dont&apos;t have an account? &nbsp;
              <Link href={`/register?redirect=${redirect || "/"}`}>
                Register
              </Link>
            </div>
          </form>
        </main>
        <footer className='flex justify-center items-center h-10 shadow-inner'>
          Copyright &copy; 2022 Zicomm
        </footer>
      </div>
    </Layout>
  );
};

export default LoginScreen;
