import Head from "next/head";
import { PropsWithChildren } from "react";
import { baseUrl, getImageUrl, getTitle } from "../util";
import { Footer } from "./footer";
import { PreviewBanner } from "./preview-banner";
import preview from "../../src/preview.png";

export function Layout({
  previewBranch,
  head: {
    title,
    description = "",
    path,
    image = {
      url: getImageUrl(preview),
      alt: "Preview of Felix Mokross' blog homepage",
    },
    includeCreator = false,
  },
  children,
}: PropsWithChildren<LayoutProps>) {
  const fullTitle = getTitle(title);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:url" content={`${baseUrl}${path}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image.url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content={image.alt} />
        <meta property="og:image:type" content="image/png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@felixmokross" />
        {includeCreator && (
          <meta property="twitter:creator" content="@felixmokross" />
        )}
      </Head>
      {previewBranch && <PreviewBanner branch={previewBranch} />}
      <div className="pb-52 md:pb-36">{children}</div>
      <Footer />
    </div>
  );
}

export type LayoutProps = {
  previewBranch: string | null;
  head: {
    title?: string;
    description?: string;
    path: string;
    image?: {
      url: string;
      alt: string;
    };
    includeCreator?: boolean;
  };
};
