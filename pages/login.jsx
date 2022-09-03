import { useSession, signIn, signOut } from "next-auth/react";
import { providers } from "../utils/constants";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import Layout from "../components/Layout";
import { useEffect } from "react";
import Link from "next/link";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  console.log(session);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session?.user) {
      setTimeout(() => {
        router.push(redirect || "/products");
      }, 3000);
    }
  }, [redirect, router, session?.user]);

  if (status === "loading") {
    return <h4>Authentication in progress......</h4>;
  }

  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: "/products" });
  };

  const formHandler = async ({ email, password }) => {
    // e.preventDefault();
    console.log(email, password);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title='login'>
      <div className='bg-slate-700'>
        <div className='flex justify-center items-center flex-col-reverse h-screen mx-auto w-[400px] p-10'>
          <form className='w-full my-4' onSubmit={handleSubmit(formHandler)}>
            <label htmlFor='email' className='text-white '>
              Email
            </label>
            <input
              type='text'
              id='email'
              className='w-full p-2 border '
              {...register("email", {
                required: "please enter email address",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "please enter a valid email address",
                },
              })}
            />
            <label htmlFor='email' className='text-white '>
              Password
            </label>
            <input
              type='text'
              id='password'
              className='w-full p-2 border '
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "password chars shoukd be greater than 5",
                },
              })}
            />
            <button
              type='submit'
              className='bg-slate-100 rounded-lg w-full text-2xl my-4 p-2'
            >
              Sign in with email
            </button>
            <p className='text-white text-2xl'>
              Dont&apos;t have an account? &nbsp;
              <Link href='/register'>Register</Link>
            </p>
          </form>
          <div className='w-full'>
            <ul className='w-full flex justify-center flex-col items-center gap-3'>
              {providers.map(({ name, icon }) => (
                <li
                  key={name}
                  className='bg-slate-100 p-2 w-full flex justify-between items-center cursor-pointer rounded-lg hover:bg-slate-200 transition-all duration-200 ease-linear '
                  onClick={() => handleSignIn(name)}
                >
                  <span className='text-4xl'>{icon}</span>
                  <span className='uppercase flex gap-2 text-xl '>
                    Sign in with {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
