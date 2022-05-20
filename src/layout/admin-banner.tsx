import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { isAuthorized } from "../shared/util";

export function AdminBanner({ previewBranch }: AdminBannerProps) {
  const session = useSession();
  const router = useRouter();
  if (session.status !== "authenticated" || !isAuthorized(session.data))
    return null;
  return (
    <div className="bg-sky-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <p className="truncate font-medium text-white">
              <span>
                Signed in as <em>{session.data.login as string}</em> &middot;{" "}
                <Link href="/admin">
                  <a>Go to Admin</a>
                </Link>
                {previewBranch && (
                  <>
                    {" "}
                    &middot; Previewing <em>{previewBranch}</em>
                  </>
                )}
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex w-full flex-shrink-0 gap-2 sm:order-2 sm:mt-0 sm:w-auto">
            {previewBranch && (
              <button
                onClick={async () => {
                  await disablePreviewMode();
                  router.push("/");
                }}
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-sky-600 shadow-sm hover:bg-sky-50"
              >
                Exit preview
              </button>
            )}
            <button
              onClick={async () => {
                await disablePreviewMode();
                await signOut({
                  callbackUrl:
                    location.pathname === "/admin" || previewBranch
                      ? "/"
                      : undefined,
                });
              }}
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-sky-600 shadow-sm hover:bg-sky-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export type AdminBannerProps = {
  previewBranch: string | null;
};

async function disablePreviewMode() {
  const response = await fetch("/api/preview", { method: "DELETE" });

  if (response.status !== 200)
    throw new Error(`Message: ${(await response.json()).message}`);
}
