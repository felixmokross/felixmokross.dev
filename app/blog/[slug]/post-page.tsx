"use client";
import { useMemo } from "react";
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
      <PostFrontMatter post={post} />
      <PostContent content={content} />
    </>
  );
}
