import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

//The Provider component from next-auth will give other pages access to session data
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
