import dayjs from "dayjs";
import Link from "next/link";
import { PostMeta } from "../../posts";
import { displayDateFormat } from "../../util";

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a className="block border-t-2 border-slate-100 p-6 dark:border-slate-800 dark:bg-slate-800 sm:rounded-xl sm:border sm:p-8 sm:shadow-xl">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-500">
            {post.kicker}
          </p>
          <div className="text-sm text-slate-400 dark:text-slate-400">
            <time dateTime={post.date}>
              {dayjs(post.date).format(displayDateFormat)}
            </time>
          </div>
        </div>
        <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
          {post.title}
        </p>
        <p className="mt-3 text-base text-slate-500 dark:text-slate-300">
          {post.description}
        </p>
      </a>
    </Link>
  );
}

export type PostListItemProps = {
  post: PostMeta;
};
