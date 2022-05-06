import Link from "next/link";
import { ReactElement } from "react";
import { alternateSiteTitle } from "../../util";

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-lg prose-slate prose-sky mx-auto mt-6 text-slate-500 dark:prose-invert dark:text-slate-300">
      {content}

      <hr />
      <p className="inline-flex w-full justify-around">
        <Link href="/blog">
          <a>&larr; {alternateSiteTitle}</a>
        </Link>
      </p>
    </div>
  );
}

export type PostContentProps = {
  content: ReactElement;
};
