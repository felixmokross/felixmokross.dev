import { getUrl } from "../../../src/shared/urls";
import { getTitle } from "../../../src/shared/util";
import { PageProps } from "./page";
import { getPostBySlug } from "../../../src/shared/posts.server";
import { getPostPath } from "../../../src/shared/urls";

export default async function Head({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  const title = getTitle(`${post.title} \u00B7 ${post.kicker}`);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={post.description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={getUrl(getPostPath(post.slug))} />
      <meta property="og:description" content={post.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={post.imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:alt" content="Blog post preview" />
      <meta property="og:image:type" content="image/png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@felixmokross" />
      <meta property="twitter:creator" content="@felixmokross" />
    </>
  );
}