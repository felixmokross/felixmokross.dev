import { PostMeta } from "../../posts";
import { PostAuthorAvatar } from "./post-author-avatar";

export function PostFrontMatter({ post }: PostFrontMatterProps) {
  return (
    <div className="mx-auto max-w-prose text-lg">
      <h1 className="mt-8">
        <span className="block text-center text-base font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-500">
          {post.kicker}
        </span>
        <span className="mt-4 block text-center text-3xl font-extrabold leading-8 tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {post.title}
        </span>
      </h1>
      <PostAuthorAvatar post={post} />
      <p className="mt-6 text-xl leading-8 text-slate-500 dark:text-slate-300">
        {post.description}
      </p>
    </div>
  );
}

export type PostFrontMatterProps = {
  post: PostMeta;
};
