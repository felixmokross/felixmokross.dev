import { signOut } from "next-auth/react";
import { disablePreviewMode } from "./preview-client";

export function SignOutButton({ isPreviewMode }: SignOutButtonProps) {
  return (
    <button
      onClick={handleSignOutClicked}
      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-sky-600 shadow-sm hover:bg-sky-50"
    >
      Sign out
    </button>
  );

  async function handleSignOutClicked() {
    await disablePreviewMode();
    await signOut({
      callbackUrl: isPreviewMode ? "/" : undefined,
    });
  }
}

export type SignOutButtonProps = {
  isPreviewMode: boolean;
};
