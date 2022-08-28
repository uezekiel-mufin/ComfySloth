import { useSession, signIn, signOut } from "next-auth/react";
import { providers } from "../utils/constants";
import { useRouter } from "next/router";

export default function Component() {
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();

  if (status === "loading") {
    return <h4>Authentication in progress......</h4>;
  }

  if (session?.user) {
    setTimeout(() => {
      push("/products");
    }, 3000);
    return (
      <div className='flex w-full h-screen justify-center items-center text-2xl italic'>
        You are already signed in as {session.user.email}
      </div>
    );
  }

  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: "/products" });
  };

  return (
    <div className='bg-slate-700'>
      <div className='flex justify-center items-center flex-col h-screen mx-auto w-[400px] p-10'>
        <form className='w-full'>
          <label htmlFor='email' className='text-white '>
            Email
          </label>
          <input type='text' id='email' className='w-full p-2 border ' />
          <button
            onClick={() => signIn()}
            className='bg-slate-100 rounded-lg w-full my-4 p-2'
          >
            Sign in with email
          </button>
        </form>
        <div className='w-full'>
          <ul className='w-full flex justify-center flex-col items-center gap-3'>
            {providers.map(({ name, icon }) => (
              <li
                key={name}
                className='bg-slate-100 p-7 w-full flex justify-between items-center cursor-pointer rounded-lg hover:bg-slate-200 transition-all duration-200 ease-linear '
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
  );
}
