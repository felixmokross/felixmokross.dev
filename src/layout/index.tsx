import { PropsWithChildren } from "react";
import { cn } from "../shared/classnames";
import { AdminBanner } from "./admin-banner";
import { Footer } from "./footer";
import { GoToTopLink } from "./go-to-top-link";
import { PageHead, PageHeadProps } from "./page-head";

export function Layout({
  previewBranch,
  pageHeadProps,
  className,
  children,
}: PropsWithChildren<LayoutProps>) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col min-h-screen-ios",
        className
      )}
    >
      <PageHead {...pageHeadProps} />
      <AdminBanner previewBranch={previewBranch} />
      <div className="flex grow flex-col pb-52 md:pb-36">{children}</div>
      <Footer />
      <GoToTopLink />
    </div>
  );
}

export type LayoutProps = {
  previewBranch: string | null;
  pageHeadProps: PageHeadProps;
  className?: string;
};
