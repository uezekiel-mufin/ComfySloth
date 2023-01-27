import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { wrapper } from '../app/Store';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSession } from 'next-auth/react';

function MyApp({ Component, pageProps: session, pageProps }) {
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  if (ssr) return;
  return (
    <SessionProvider session={session}>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </GoogleOAuthProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);

function Auth({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}
