import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

//The Provider component from next-auth will give other pages access to session data
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
