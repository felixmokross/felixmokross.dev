import Link from "next/link";
import { useMemo } from "react";
import { alternateSiteTitle } from "../../../src/shared/util";
import { htmlToReact } from "./transform/html-to-react";

export type PostContentProps = {
  html: string;
};

export function PostContent({ html }: PostContentProps) {
  const content = useMemo(() => htmlToReact(html), [html]);

  return (
    <div className="prose prose-lg prose-slate prose-sky mx-auto mt-6 text-slate-500 dark:prose-invert dark:text-slate-300">
      {content}

      <hr />
      <p className="inline-flex w-full justify-around">
        <Link href="/blog">&larr; {alternateSiteTitle}</Link>
      </p>
    </div>
  );
}
