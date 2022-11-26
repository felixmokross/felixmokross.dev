import { signOut } from "next-auth/react";
import { LogoutIcon } from "../../shared/icons";

export function SignOutButton() {
  async function handleSignOutClicked() {
    await signOut();
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
