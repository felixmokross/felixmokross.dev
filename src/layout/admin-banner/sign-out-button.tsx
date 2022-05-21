import { signOut } from "next-auth/react";
import { LogoutIcon } from "../../shared/icons";
import { disablePreviewMode } from "./preview-client";

export function SignOutButton({ isPreviewMode }: SignOutButtonProps) {
  return (
    <button
      onClick={handleSignOutClicked}
      className="text-slate-100 hover:text-white"
    >
      <LogoutIcon className="h-5 w-5" />
    </button>
  );

  async function handleSignOutClicked() {
    await disablePreviewMode();
    await signOut({
      callbackUrl: isPreviewMode ? "/blog" : undefined,
    });
  }
}

export type SignOutButtonProps = {
  isPreviewMode: boolean;
};
