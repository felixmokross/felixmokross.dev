import "../styles/globals.css";
import "../styles/highlight.css";
import type { AppProps } from "next/app";
import { BlogToaster } from "../blog-toaster";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../layout";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function MyApp({
  Component,
  pageProps: { session, layoutProps, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout {...layoutProps} className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </Layout>
      <BlogToaster />
    </SessionProvider>
  );
}

export default MyApp;
