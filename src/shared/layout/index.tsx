import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { GoToTopLink } from "./go-to-top-link";
import { PageHead, PageHeadProps } from "./page-head";
import { PreviewBanner } from "./preview-banner";

export function Layout({
  previewBranch,
  pageHeadProps: pageHeadProps,
  children,
}: PropsWithChildren<LayoutProps>) {
  return (
    <div className="relative">
      <PageHead {...pageHeadProps} />
      {previewBranch && <PreviewBanner branch={previewBranch} />}
      <div className="pb-52 md:pb-36">{children}</div>
      <Footer />
      <GoToTopLink />
    </div>
  );
}

export type LayoutProps = {
  previewBranch: string | null;
  pageHeadProps: PageHeadProps;
};
