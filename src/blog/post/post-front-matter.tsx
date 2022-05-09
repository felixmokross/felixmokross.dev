import toast from "react-hot-toast";
import { LinkIcon, TwitterIcon } from "../../icons";
import { PostMeta } from "../../posts";
import { baseUrl } from "../../util";
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
      <div className="mt-14 flex items-center justify-between gap-4">
        <PostAuthorAvatar post={post} />
        <div className="flex items-center gap-4">
          <CopyPostLinkButton />
          <ShareOnTwitterButton post={post} />
        </div>
      </div>
      <p className="mt-6 text-xl leading-8 text-slate-500 dark:text-slate-300">
        {post.description}
      </p>
    </div>
  );
}

export type PostFrontMatterProps = {
  post: PostMeta;
};

function CopyPostLinkButton() {
  return (
    <a
      onClick={async (e) => {
        e.preventDefault();

        history.replaceState({}, "", location.pathname);

        await navigator.clipboard.writeText(location.href);
        toast.success("Link copied to clipboard");
      }}
      className="block text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400"
      href="#"
      title="Copy link to post"
    >
      <LinkIcon className="h-7 w-7" />
    </a>
  );
}

function ShareOnTwitterButton({ post }: ShareOnTwitterButtonProps) {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  return (
    <a
      className="block text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400"
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postUrl
      )}`}
      rel="noreferrer"
      target="_blank"
      title="Share on Twitter"
    >
      <TwitterIcon className="h-7 w-7" />
    </a>
  );
}
type ShareOnTwitterButtonProps = {
  post: PostMeta;
};
