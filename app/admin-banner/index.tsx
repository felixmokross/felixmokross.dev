"use client";
import { useSession } from "next-auth/react";
import { BlogSession } from "../../common/types";
import { isAuthorized } from "../../common/util";
import { ExcludeFromAnalyticsPopover } from "./exclude-from-analytics-popover";
import { SignOutButton } from "./sign-out-button";

export function AdminBanner() {
  const session = useSession();

  if (
    session.status !== "authenticated" ||
    !isAuthorized(session.data as BlogSession)
  ) {
    return null;
  }
  return (
    <div className="bg-sky-600">
      <div className="mx-auto flex max-w-3xl justify-between py-4 px-4 text-base text-slate-100">
        <div className="flex items-center gap-4">
          <ExcludeFromAnalyticsPopover />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
