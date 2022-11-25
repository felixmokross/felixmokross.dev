import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getAllPosts } from "../shared/posts.server";
import { getPostUrl, getUrl } from "../shared/urls";
import { homePageLastModified } from "../../app/blog/head";

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

const sitemapDateFormat = "YYYY-MM-DD";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = await generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };

  async function generateSiteMap() {
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
};

export default SiteMap;
