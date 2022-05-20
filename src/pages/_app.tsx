import "../styles/globals.css";
import "../styles/highlight.css";
import type { AppProps } from "next/app";
import { BlogToaster } from "../blog-toaster";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../layout";

function MyApp({
  Component,
  pageProps: { session, layoutProps, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
      <BlogToaster />
    </SessionProvider>
  );
}

export default MyApp;
