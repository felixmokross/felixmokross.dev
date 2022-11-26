"use client";
import toast from "react-hot-toast";
import { LinkIcon } from "../../../shared/icons";
import { ShareButton } from "./share-button";

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
