import dayjs from "dayjs";
import { getAllPosts } from "../common/posts.server";
import { getPostUrl, getUrl, rssUrl } from "../common/urls";
import { accentColor, alternateSiteTitle } from "../common/util";
import fs from "fs/promises";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);

const rssDateFormat = "ddd, DD MMM YYYY HH:mm:ss ZZ";

generateRss().catch(console.error);

async function generateRss() {
  console.log("generating RSS feed");
  await fs.mkdir("public/blog", { recursive: true });
  await fs.writeFile("public/blog/rss.xml", await getRss());
  console.log("generating RSS feed [done]");
}

async function getRss() {
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
         <webfeeds:cover image="${getUrl("/preview.png")}" />
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

function cdata(s: string) {
  return `<![CDATA[${s}]]>`;
}
