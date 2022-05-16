import { AnchorHTMLAttributes, DetailedHTMLProps, ReactElement } from "react";
import toast from "react-hot-toast";
import { IconProps, LinkedinIcon, LinkIcon, TwitterIcon } from "../../icons";
import { PostMeta } from "../../types";
import { getPostUrl } from "../../urls";

export function CopyPostLinkButton() {
  return (
    <ShareButton
      onClick={async (e) => {
        e.preventDefault();

        history.replaceState({}, "", location.pathname);

        await navigator.clipboard.writeText(location.href);
        toast.success("Link copied to clipboard");
      }}
      href="#"
      title="Copy link to post"
      icon={LinkIcon}
    />
  );
}

export function ShareOnTwitterButton({ post }: ShareOnTwitterButtonProps) {
  return (
    <ShareButton
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
        getPostUrl(post.slug)
      )}`}
      rel="noreferrer"
      target="_blank"
      title="Share on Twitter"
      icon={TwitterIcon}
    />
  );
}

export type ShareOnTwitterButtonProps = {
  post: PostMeta;
};

export function ShareOnLinkedinButton({ post }: ShareOnLinkedinButtonProps) {
  return (
    <ShareButton
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        getPostUrl(post.slug)
      )}`}
      rel="noreferrer"
      target="_blank"
      title="Share on LinkedIn"
      icon={LinkedinIcon}
    />
  );
}

export type ShareOnLinkedinButtonProps = {
  post: PostMeta;
};

function ShareButton({ icon: Icon, ...props }: ShareButtonProps) {
  return (
    <a
      {...props}
      className="block text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400"
    >
      <Icon className="h-7 w-7" />
    </a>
  );
}

type ShareButtonProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  icon: (props: IconProps) => ReactElement;
};
