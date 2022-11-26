import { previewData } from "next/headers";
import { Header } from "../../../src/blog/[slug]/header";
import { PostContainer } from "../../../src/blog/[slug]/post-container";
import { PostFrontMatter } from "../../../src/blog/[slug]/post-front-matter";
import { markdownToHtml } from "../../../src/blog/[slug]/transform/markdown-to-html.server";
import { getPostBySlug } from "../../../src/shared/posts.server";
import { PreviewData } from "../../../src/shared/util.server";
import { PostPage } from "./post-page";

// doesn't seem to work with previewData
// see https://github.com/vercel/next.js/discussions/42360
// see https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering#using-dynamic-functions

// export async function generateStaticParams() {
//   const slugs = await getPostSlugs();
//   return slugs.map((slug) => ({ slug }));
// }

export type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const preview = previewData() as PreviewData;
  const post = await getPostBySlug(params.slug, preview.branch);
  const html = await markdownToHtml(post.content);

  return (
    <>
      <Header />
      <PostContainer>
        <PostFrontMatter post={post} />
        <PostPage html={html} />
      </PostContainer>
    </>
  );
}
