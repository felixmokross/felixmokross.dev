"use client";
import { useMemo } from "react";
import { Header } from "../../../src/blog/[slug]/header";
import { PostContainer } from "../../../src/blog/[slug]/post-container";
import { PostContent } from "../../../src/blog/[slug]/post-content";
import { PostFrontMatter } from "../../../src/blog/[slug]/post-front-matter";
import { htmlToReact } from "../../../src/blog/[slug]/transform/html-to-react";
import { PostMeta } from "../../../src/shared/types";

export type PostPageProps = {
  post: PostMeta;
  html: string;
};

export function PostPage({ post, html }: PostPageProps) {
  const content = useMemo(() => htmlToReact(html), [html]);

  return (
    <>
      <Header />
      <PostContainer>
        <PostFrontMatter post={post} />
        <PostContent content={content} />
      </PostContainer>
    </>
  );
}
