import { useRouter } from "next/router";

export function PreviewBanner({ branch }: PreviewBannerProps) {
  const router = useRouter();
  return (
    <div className="bg-sky-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <p className="truncate font-medium text-white">
              <span>
                Previewing branch <em>{branch}</em>
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <button
              onClick={async () => {
                const response = await fetch("/api/preview", {
                  method: "DELETE",
                });

                if (response.status !== 200)
                  throw new Error(
                    `Message: ${(await response.json()).message}`
                  );

                router.push("/");
              }}
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-sky-600 shadow-sm hover:bg-sky-50"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export type PreviewBannerProps = {
  branch: string;
};
