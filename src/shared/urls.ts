import type { StaticImageData } from "next/legacy/image";

export const baseUrl = "https://www.felixmokross.dev";
export const rssUrl = getUrl("/blog/rss.xml");

export function getImageUrl(image: StaticImageData): string {
  return `${baseUrl}${image.src}`;
}

export function getPostPath(slug: string): string {
  return `/blog/${slug}`;
}

export function getPostUrl(slug: string): string {
  return getUrl(getPostPath(slug));
}

export function getUrl(path: string): string {
  return `${baseUrl}${path}`;
}
