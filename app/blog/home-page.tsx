"use client";
import { Bio } from "../../src/blog/index/bio";
import { HomeContainer } from "../../src/blog/index/home-container";
import { PostList } from "../../src/blog/index/post-list";
import { PostMeta } from "../../src/shared/types";

export type HomePageProps = { posts: PostMeta[] };

export function HomePage({ posts }: HomePageProps) {
  return (
    <HomeContainer>
      <Bio />
      <PostList posts={posts} />
    </HomeContainer>
  );
}
