import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export type PreviewData = {
  branch: string;
};

export type CommonPageProps = {
  layoutProps: {
    previewBranch: string | null;
  };
};

export function getPreviewBranch<Q extends ParsedUrlQuery>({
  preview,
  previewData,
}: GetStaticPropsContext<Q, PreviewData>): string | null {
  return preview && previewData ? previewData.branch : null;
}

export function getCommonPageProps<Q extends ParsedUrlQuery>(
  context: GetStaticPropsContext<Q, PreviewData>
): CommonPageProps {
  return { layoutProps: { previewBranch: getPreviewBranch(context) } };
}
