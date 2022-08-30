import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { wrapper } from "../app/Store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: session, pageProps }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);

function Auth({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession({
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
