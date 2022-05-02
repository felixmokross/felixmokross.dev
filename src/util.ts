import { StaticImageData } from "next/image";

export type PostMeta = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  lastModified: string;
  description: string;
  imageUrl: string;
};

const siteTitle = "Felix Mokross";
export const alternateSiteTitle = "felixmokross.dev";

export const domain = "felixmokross.dev";
export const baseUrl = "https://www.felixmokross.dev";
export const accentColor = "0EA5E9";

export const postDateFormat = "YYYY-MM-DD";

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
