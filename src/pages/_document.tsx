import Document, { Html, Head, Main, NextScript } from "next/document";
import { rssUrl } from "../urls";
import { alternateSiteTitle, domain } from "../util";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="alternate"
            type="application/rss+xml"
            title={`RSS Feed for ${alternateSiteTitle}`}
            href={rssUrl}
          />
          <link rel="icon" type="image/png" href="/favicon_v2.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=optional"
            rel="stylesheet"
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
