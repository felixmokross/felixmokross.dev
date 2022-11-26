import { PropsWithChildren } from "react";
import { rssUrl } from "../src/shared/urls";
import { alternateSiteTitle, domain } from "../src/shared/util";
import "../src/styles/globals.css";
import "../src/styles/highlight.css";
import { Inter } from "@next/font/google";
import { cn } from "../src/shared/classnames";
import { Footer } from "../src/layout/footer";
import { GoToTopLink } from "../src/layout/go-to-top-link";
import { BlogToaster } from "../src/blog-toaster";
import { SessionProvider } from "./session-provider";
import { AdminBanner } from "../src/layout/admin-banner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <head>
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
        <SessionProvider>
          <div
            className={cn(
              "relative flex min-h-screen flex-col min-h-screen-ios"
            )}
          >
            <AdminBanner />
            <div className="flex grow flex-col pb-52 md:pb-36">{children}</div>
            <Footer />
            <GoToTopLink />
          </div>
          <BlogToaster />
        </SessionProvider>
      </body>
    </html>
  );
}
