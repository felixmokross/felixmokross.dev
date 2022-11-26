"use client";
import { useMemo } from "react";
import { PostContent } from "../../../src/blog/[slug]/post-content";
import { htmlToReact } from "../../../src/blog/[slug]/transform/html-to-react";

export type PostPageProps = {
  html: string;
};

export function PostPage({ html }: PostPageProps) {
  const content = useMemo(() => htmlToReact(html), [html]);

  return <PostContent content={content} />;
}
