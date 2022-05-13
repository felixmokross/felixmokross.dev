import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getAllPosts } from "../../posts";
import preview from "../../src/preview.png";
import { getImageUrl, getPostUrl, getUrl, rssUrl } from "../../urls";
import { accentColor, alternateSiteTitle } from "../../util";

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rss = await generateRss();

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.write(rss);
  res.end();

  return { props: {} };

  async function generateRss() {
    await import("../../dayjs.plugins");
    const posts = await getAllPosts();

    const channelLastChanged = dayjs
      .max(posts.map((p) => dayjs(p.lastModified)))
      .format(rssDateFormat);

    return `<?xml version="1.0" encoding="UTF-8"?>
     <rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0" version="2.0">
       <channel>
         <title>${alternateSiteTitle}</title>
         <link>${getUrl("/blog")}</link>
         <description>I'm passionate about web development and UX. On this blog I explore working with technologies like React, Next.js, and TypeScript.</description>
         <language>en-us</language>
         <ttl>60</ttl>
         <lastBuildDate>${channelLastChanged}</lastBuildDate>
         <atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
         <webfeeds:cover image="${getImageUrl(preview)}" />
         <webfeeds:icon>${getUrl("/favicon_v2.png")}</webfeeds:icon>
         <webfeeds:logo>${getUrl("/favicon_v2.svg")}</webfeeds:logo>
         <webfeeds:accentColor>${accentColor}</webfeeds:accentColor>
         ${posts
           .map(
             ({ title, kicker, description, date, slug }) => `
           <item>
             <title>${cdata(`${kicker}: ${title}`)}</title>
             <description>${cdata(description)}</description>
             <pubDate>${dayjs(date).format(rssDateFormat)}</pubDate>
             <link>${getPostUrl(slug)}</link>
             <guid>${getPostUrl(slug)}</guid>
           </item>`
           )
           .join("")}
       </channel>
     </rss>
   `;
  }
};

export default SiteMap;

function cdata(s: string) {
  return `<![CDATA[${s}]]>`;
}

const rssDateFormat = "ddd, DD MMM YYYY HH:mm:ss ZZ";
