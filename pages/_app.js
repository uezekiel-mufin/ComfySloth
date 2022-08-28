import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { wrapper } from "../app/Store";
function MyApp({ Component, pageProps: session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
