import { signOut } from "next-auth/react";
import { LogoutIcon } from "../../shared/icons";
import { disablePreviewMode } from "./preview-client";

export function SignOutButton({ isPreviewMode }: SignOutButtonProps) {
  async function handleSignOutClicked() {
    await disablePreviewMode();
    await signOut({
      callbackUrl: isPreviewMode ? "/blog" : undefined,
    });
  }

  return (
    <button
      onClick={handleSignOutClicked}
      className="text-slate-100 hover:text-white"
    >
      <LogoutIcon className="h-5 w-5" />
    </button>
  );
}

export type SignOutButtonProps = {
  isPreviewMode: boolean;
};
