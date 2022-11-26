import { Header } from "../../../src/blog/[slug]/header";
import { PostContainer } from "../../../src/blog/[slug]/post-container";
import { PostFrontMatter } from "../../../src/blog/[slug]/post-front-matter";
import { markdownToHtml } from "../../../src/blog/[slug]/transform/markdown-to-html.server";
import { getPostBySlug, getPostSlugs } from "../../../src/shared/posts.server";
import { PostPage } from "./post-page";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
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
