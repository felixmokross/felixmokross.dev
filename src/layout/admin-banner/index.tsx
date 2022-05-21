import { useSession } from "next-auth/react";
import { isAuthorized } from "../../shared/util";
import { ExcludeFromAnalyticsSwitch } from "./exclude-from-analytics-switch";
import { PreviewModeDropdown } from "./preview-mode-dropdown";
import { SignOutButton } from "./sign-out-button";

export function AdminBanner({ previewBranch }: AdminBannerProps) {
  const session = useSession();

  if (session.status !== "authenticated" || !isAuthorized(session.data))
    return null;
  return (
    <div className="bg-sky-600">
      <div className="mx-auto flex max-w-3xl justify-between py-4 px-4 text-base text-slate-100">
        <PreviewModeDropdown previewBranch={previewBranch} />
        <div className="flex items-center gap-4">
          <ExcludeFromAnalyticsSwitch />
          <SignOutButton isPreviewMode={!!previewBranch} />
        </div>
      </div>
    </div>
  );
}

export type AdminBannerProps = {
  previewBranch: string | null;
};
