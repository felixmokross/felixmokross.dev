export const baseUrl = process.env.BASE_URL;
if (!baseUrl) throw new Error("BASE_URL is not defined");

export const rssUrl = getUrl("/blog/rss.xml");

export function getPostPath(slug: string): string {
  return `/blog/${slug}`;
}

export function getPostUrl(slug: string): string {
  return getUrl(getPostPath(slug));
}

export function getUrl(path: string): string {
  return `${baseUrl}${path}`;
}
