import Document, { Html, Head, Main, NextScript } from "next/document";
import { rssUrl } from "../shared/urls";
import { alternateSiteTitle, domain } from "../shared/util";
import "../dayjs.server";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
        </Head>
        <body className="bg-white dark:bg-slate-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
