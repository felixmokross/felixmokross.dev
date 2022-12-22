import { LinkedinIcon, TwitterIcon } from "../../../../common/icons";
import { PostMeta } from "../../../../common/types";
import { getPostUrl } from "../../../../common/urls.server";
import { ShareButton } from "./share-button";

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
