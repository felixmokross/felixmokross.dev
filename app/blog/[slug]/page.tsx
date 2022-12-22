import { Header } from "./header";
import { PostContainer } from "./post-container";
import { PostFrontMatter } from "./post-front-matter";
import { markdownToHtml } from "./transform/markdown-to-html.server";
import { getPostBySlug, getPostSlugs } from "../../common/posts.server";
import { PostContent } from "./post-content";

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
        <PostContent html={html} />
      </PostContainer>
    </>
  );
}
