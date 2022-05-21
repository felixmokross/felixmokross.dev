import { useSession } from "next-auth/react";
import { isAuthorized } from "../../shared/util";
import { ExcludeFromAnalyticsSwitch } from "./exclude-from-analytics-switch";
import { SignOutButton } from "./sign-out-button";
import { PreviewModeDropdown } from "./preview-mode-dropdown";

export function AdminBanner({ previewBranch }: AdminBannerProps) {
  const session = useSession();

  if (session.status !== "authenticated" || !isAuthorized(session.data))
    return null;
  return (
    <div className="bg-sky-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <p className="truncate font-medium text-white">
              <span>
                Signed in as <em>{session.data.login as string}</em>
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex w-full flex-shrink-0 gap-2 sm:order-2 sm:mt-0 sm:w-auto">
            <ExcludeFromAnalyticsSwitch />
            <PreviewModeDropdown previewBranch={previewBranch} />
            <SignOutButton isPreviewMode={!!previewBranch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export type AdminBannerProps = {
  previewBranch: string | null;
};
