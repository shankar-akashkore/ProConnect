import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return < >
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap" rel="stylesheet" />
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  </>
}
