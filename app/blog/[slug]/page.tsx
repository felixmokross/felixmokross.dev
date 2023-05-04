import { Header } from "./header";
import { PostContainer } from "./post-container";
import { PostFrontMatter } from "./post-front-matter";
import { markdownToHtml } from "./transform/markdown-to-html.server";
import { getPostBySlug, getPostSlugs } from "../../common/posts.server";
import { PostContent } from "./post-content";
import type { Metadata } from "next";
import { getTitle } from "../../common/util";
import { getPostUrl } from "../../common/urls.server";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const title = getTitle(`${post.title} \u00B7 ${post.kicker}`);
  return {
    title,
    description: post.description,
    openGraph: {
      title,
      url: getPostUrl(post.slug),
      description: post.description,
      type: "website",
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 600,
          alt: "Blog post preview",
          type: "image/png",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@felixmokross",
      creator: "@felixmokross"
    }
  };
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
