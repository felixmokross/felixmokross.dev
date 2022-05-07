import { PropsWithChildren } from "react";
import social from "./social";

export default function Layout({
  previewBranch,
  children,
}: PropsWithChildren<LayoutProps>) {
  return (
    <div className="relative min-h-screen">
      {previewBranch && <PreviewBanner branch={previewBranch} />}
      <div className="pb-52 md:pb-36">{children}</div>
      <Footer />
    </div>
  );
}

type LayoutProps = {
  previewBranch: string | null;
};

function PreviewBanner({ branch }: PreviewBannerProps) {
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
              onClick={() => {
                window.location.href = "/api/preview/disable";
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

type PreviewBannerProps = {
  branch: string;
};

function Footer() {
  return (
    <footer className="absolute bottom-0 w-full border-t-2 border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
      <div
        className={
          "mx-auto max-w-3xl px-6 py-12 md:flex md:items-center md:justify-between"
        }
      >
        <div className="flex justify-center space-x-6 md:order-2">
          {social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
              title={item.name}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-slate-400 dark:text-slate-400">
            &copy; Felix Mokross
          </p>
        </div>
      </div>
    </footer>
  );
}
