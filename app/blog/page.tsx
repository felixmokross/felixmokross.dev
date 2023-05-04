import { getAllPosts } from "../common/posts.server";
import { HomeContainer } from "./home-container";
import { Bio } from "./bio";
import { PostList } from "./post-list";
import type { Metadata } from "next";
import { getTitle } from "../common/util";
import { getUrl } from "../common/urls.server";

const title = getTitle("Blog");
const description = "Zurich-based software engineer \u00B7 Lead Architect at Zühlke \u00B7 I'm passionate about web development and UX. On this blog I explore working with technologies like React, Next.js, and TypeScript.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    url: getUrl("/blog"),
    description,
    type: "website",
    images: [
      {
        url: getUrl("/preview.png"),
        width: 1200,
        height: 600,
        alt: "Preview of Felix Mokross' blog homepage",
        type: "image/png"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@felixmokross",
  },
  alternates: {
    "canonical": getUrl("/blog")
  }
};

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <HomeContainer>
      <Bio />
      <PostList posts={posts} />
    </HomeContainer>
  );
}
