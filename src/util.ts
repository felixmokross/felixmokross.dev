import { GetStaticPropsContext } from "next";
import { StaticImageData } from "next/image";
import { ParsedUrlQuery } from "querystring";

const siteTitle = "Felix Mokross";
export const alternateSiteTitle = "felixmokross.dev";

export const domain = "felixmokross.dev";
export const baseUrl = "https://www.felixmokross.dev";
export const accentColor = "0EA5E9";

export const displayDateFormat = "D MMMM YYYY";

export function getImageUrl(image: StaticImageData): string {
  return `${baseUrl}${image.src}`;
}

export function getTitle(pageTitle?: string) {
  if (!pageTitle) {
    return siteTitle;
  }

  return `${pageTitle} \u00B7 ${siteTitle}`;
}

export function cn(...args: ClassNameConfig[]): string {
  return args
    .filter(isApplicable)
    .flatMap((arg) => (typeof arg === "object" ? objectToClasses(arg) : [arg]))
    .join(" ");
}

function isApplicable(arg: ClassNameConfig): arg is string | object {
  return !!arg && arg !== true;
}

function objectToClasses(obj: object): string[] {
  return Object.entries(obj)
    .filter(([, enabled]) => enabled)
    .map(([className]) => className);
}

type ClassNameConfig = boolean | undefined | null | string | object;

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
