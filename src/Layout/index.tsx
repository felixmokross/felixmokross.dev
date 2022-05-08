import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { PreviewBanner } from "./preview-banner";

export function Layout({
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

export type LayoutProps = {
  previewBranch: string | null;
};
