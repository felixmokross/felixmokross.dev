import dayjs from "dayjs";
import Link from "next/link";
import { PostMeta } from "../../types";
import { getPostPath } from "../../urls";
import { displayDateFormat } from "../../util";

export function PostList({ posts }: PostListProps) {
  return (
    <div className="mx-auto mt-24 space-y-6 sm:max-w-xl sm:space-y-12">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </div>
  );
}

export type PostListProps = {
  posts: PostMeta[];
};

function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={getPostPath(post.slug)}>
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
        <p
          className="mt-3 text-justify text-base text-slate-500 dark:text-slate-300"
          style={{ hyphens: "auto", WebkitHyphens: "auto" }}
        >
          {post.description}
        </p>
      </a>
    </Link>
  );
}

type PostListItemProps = {
  post: PostMeta;
};
