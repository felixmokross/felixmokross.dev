import dayjs from "dayjs";
import fs from "fs/promises";
import homePageLastModified from "../app/blog/last-modified";
import { getAllPosts } from "../common/posts.server";
import { getPostUrl, getUrl } from "../common/urls";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);

const sitemapDateFormat = "YYYY-MM-DD";

generateSitemap().catch(console.error);

async function generateSitemap() {
  console.log("generating sitemap…");
  await fs.writeFile("public/sitemap.xml", await getSitemap());
  console.log("generating sitemap [done]");
}

async function getSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${getUrl("/blog")}</loc>
         <lastmod>${await getHomePageLastModified()}</lastmod>
       </url>
       ${(await getAllPosts())
         .map(({ slug, lastModified }) => {
           return `
         <url>
             <loc>${getPostUrl(slug)}</loc>
             <lastmod>${dayjs(lastModified).format(sitemapDateFormat)}</lastmod>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

async function getHomePageLastModified() {
  return dayjs
    .max(
      [dayjs(homePageLastModified)].concat(
        (await getAllPosts()).map((p) => dayjs(p.lastModified))
      )
    )
    .format(sitemapDateFormat);
}
