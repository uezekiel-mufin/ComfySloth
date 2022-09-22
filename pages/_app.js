import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { wrapper } from "../app/Store";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps: session, pageProps }) {
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
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });

  if (status === "loading") {
    return <h4>Loading.....</h4>;
  }

  return children;
}
