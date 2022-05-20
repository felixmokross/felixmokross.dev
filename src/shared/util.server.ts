import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { LayoutProps } from "../layout";

export type PreviewData = {
  branch: string;
};

export type CommonPageProps = {
  layoutProps: LayoutProps;
};

export function getPreviewBranch<Q extends ParsedUrlQuery>({
  preview,
  previewData,
}: GetStaticPropsContext<Q, PreviewData>): string | null {
  return preview && previewData ? previewData.branch : null;
}
