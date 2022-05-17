import { getTitle } from "../../shared/util";
import preview from "../preview.png";
import Head from "next/head";
import { getImageUrl, getUrl } from "../../shared/urls";

export function PageHead({
  title,
  description = "",
  path,
  image = {
    url: getImageUrl(preview),
    alt: "Preview of Felix Mokross' blog homepage",
  },
  includeCreator = false,
  canonical,
}: PageHeadProps) {
  const fullTitle = getTitle(title);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:url" content={`${getUrl(path)}`} />
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
      {canonical && <link rel="canonical" href={getUrl(canonical)} />}
    </Head>
  );
}

export type PageHeadProps = {
  title?: string;
  description?: string;
  path: string;
  image?: {
    url: string;
    alt: string;
  };
  includeCreator?: boolean;
  canonical?: string;
};
