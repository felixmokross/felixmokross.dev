import { getUrl } from "../common/urls.server";
import { getTitle } from "../common/util";

const title = getTitle("Blog");
const description =
  "Zurich-based software engineer \u00B7 Lead Architect at Zühlke \u00B7 I'm passionate about web development and UX. On this blog I explore working with technologies like React, Next.js, and TypeScript.";

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={getUrl("/blog")} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={getUrl("/preview.png")} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta
        property="og:image:alt"
        content="Preview of Felix Mokross' blog homepage"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@felixmokross" />
      <link rel="canonical" href={getUrl("/blog")} />
    </>
  );
}
