import { PostMeta } from "../../../common/types";
import { CopyPostLinkButton } from "./share-buttons/copy-post-link-button";
import { PostAuthorAvatar } from "./post-author-avatar";
import {
  ShareOnLinkedinButton,
  ShareOnTwitterButton,
} from "./share-buttons/social-share-buttons";

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
      <div className="mt-14 flex items-center justify-between gap-4">
        <PostAuthorAvatar post={post} />
        <div className="flex items-center gap-4">
          <CopyPostLinkButton />
          <ShareOnTwitterButton post={post} />
          <ShareOnLinkedinButton post={post} />
        </div>
      </div>
      <p
        className="mt-6 text-justify text-xl leading-8 text-slate-500 dark:text-slate-300"
        style={{ hyphens: "auto", WebkitHyphens: "auto" }}
      >
        {post.description}
      </p>
    </div>
  );
}

export type PostFrontMatterProps = {
  post: PostMeta;
};
