import "../styles/globals.css";
import "../styles/highlight.css";
import type { AppProps } from "next/app";
import { BlogToaster } from "../toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <BlogToaster />
    </>
  );
}

export default MyApp;
