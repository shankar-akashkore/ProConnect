import FooterComponent from "@/components/FooterComponent";
import NavbarComponent from "@/components/NavbarComponent";
import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const hideNavBarFooter = ["/login","/signup","/register"].includes(router.pathname);

  return ( 
  < >
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap" rel="stylesheet" />
  <Provider store={store}>
    {!hideNavBarFooter && <NavbarComponent/>}
    <Component {...pageProps} />
    {!hideNavBarFooter && <FooterComponent/>}
  </Provider>
  </>
  )
}
