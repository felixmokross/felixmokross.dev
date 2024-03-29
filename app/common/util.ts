const siteTitle = "Felix Mokross";
export const alternateSiteTitle = "felixmokross.dev";

export const domain = "felixmokross.dev";
export const accentColor = "0EA5E9";

export const displayDateFormat = "D MMMM YYYY";

export function getTitle(pageTitle?: string) {
  if (!pageTitle) {
    return siteTitle;
  }

  return `${pageTitle} \u00B7 ${siteTitle}`;
}
