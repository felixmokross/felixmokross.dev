import { PropsWithChildren } from "react";
import { rssUrl } from "../common/urls";
import { alternateSiteTitle, domain } from "../common/util";
import "../styles/globals.css";
import "../styles/highlight.css";
import { Inter } from "@next/font/google";
import { cn } from "../common/classnames";
import { Footer } from "./footer";
import { GoToTopLink } from "./go-to-top-link";
import { BlogToaster } from "./blog-toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=3"
        />
        <link rel="manifest" href="/site.webmanifest?v=3" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg?v=3"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />

        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS Feed for ${alternateSiteTitle}`}
          href={rssUrl}
        />
        <script
          defer
          data-domain={domain}
          src="https://plausible.io/js/plausible.outbound-links.js"
        ></script>
      </head>
      <body
        className={`bg-white dark:bg-slate-900 ${inter.variable} font-sans`}
      >
        <div
          className={cn("relative flex min-h-screen flex-col min-h-screen-ios")}
        >
          <div className="flex grow flex-col pb-52 md:pb-36">{children}</div>
          <Footer />
          <GoToTopLink />
        </div>
        <BlogToaster />
      </body>
    </html>
  );
}
