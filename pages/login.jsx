import { useSession, signIn } from 'next-auth/react';
import { providers } from '../utils/constants';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from '../utils/error';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (session?.user) {
      setTimeout(() => {
        router.push(redirect || '/products');
      }, 100);
    }
  }, [redirect, router, session?.user]);

  if (status === 'loading') {
    return <h4>Authentication in progress......</h4>;
  }

  const handleSignIn = (provider) => {
    signIn(provider);
  };

  const formHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }

      toast.success('Welcome to Zicomms ');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title='login'>
      <div className='bg-[#ebdcce]'>
        <ToastContainer position='top-center' />
        <div className='flex justify-center items-center flex-col-reverse h-screen mx-auto w-full md:w-[450px] p-4 md:p-10'>
          <form
            className='mx-auto max-w-screen w-full md:w-[500px] px-4 py-8 bg-[#e7bd93]'
            onSubmit={handleSubmit(formHandler)}
          >
            <div>
              <label
                htmlFor='email'
                className='text-gray-800 font-semibold text-2xl '
              >
                Email
              </label>
              <input
                type='text'
                id='email'
                className='w-full p-2 border mb-2 rounded-lg py-4'
                {...register('email', {
                  required: 'please enter email address',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'please enter a valid email address',
                  },
                })}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='text-gray-800 font-semibold text-2xl '
              >
                Password
              </label>
              <input
                type='text'
                id='password'
                className='w-full p-2 border rounded-lg py-4 '
                {...register('password', {
                  required: 'Please enter your password',
                  minLength: {
                    value: 6,
                    message: 'password chars shoukd be greater than 5',
                  },
                })}
              />
            </div>
            <button
              type='submit'
              className='login-button rounded-lg w-full text-xl my-4 p-4 mt-4'
            >
              Sign in with email
            </button>
            <p className='text-gray-700  text-lg'>
              Dont&apos;t have an account? &nbsp;
              <Link href='/register'>
                <a className='underline'>Register</a>
              </Link>
            </p>
          </form>
          <div className='w-full'>
            <ul className='w-full flex justify-center flex-col items-center gap-3'>
              {providers.map(({ name, icon }) => (
                <li
                  key={name}
                  className='hidden bg-slate-100 p-3 w-full  justify-between items-center cursor-pointer rounded-lg hover:bg-slate-200 transition-all duration-200 ease-linear '
                  onClick={() => handleSignIn(name)}
                >
                  <span className='text-2xl'>{icon}</span>
                  <span className='uppercase flex gap-2 text-lg '>
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
