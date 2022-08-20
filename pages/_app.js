import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../app/Store";
// import { wrapper } from "../app/Store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
// export default wrapper.withRedux(MyApp);
