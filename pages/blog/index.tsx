import type { GetStaticProps, NextPage } from "next";
import {
  baseUrl,
  getImageUrl,
  getTitle,
  PostMeta,
  PreviewData,
} from "../../src/util";
import Head from "next/head";
import Layout from "../../src/Layout";
import preview from "../../src/preview.png";
import { getAllPosts } from "../../src/posts";
import PostListItem from "../../src/blog/home/PostListItem";
import Bio from "../../src/blog/home/Bio";
import { ParsedUrlQuery } from "querystring";

export const homePageLastModified = "2022-04-30";

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  const title = getTitle("Blog");
  const description =
    "Zurich-based software engineer \u00B7 Lead Architect at Zühlke \u00B7 I'm passionate about web development and UX. On this blog I explore working with technologies like React, Next.js, and TypeScript.";
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${baseUrl}/blog`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={getImageUrl(preview)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta
          property="og:image:alt"
          content="Preview of Felix Mokross' blog homepage"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@felixmokross" />
      </Head>
      <div className="relative px-0 pt-20 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <Bio />

        <div className="mx-auto mt-24 space-y-6 sm:max-w-xl sm:space-y-12">
          {posts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<
  HomePageProps,
  ParsedUrlQuery,
  PreviewData
> = async ({ preview, previewData }) => {
  const posts = await getAllPosts(
    preview && previewData ? previewData.branch : null
  );

  return { props: { posts } };
};

export default HomePage;

type HomePageProps = {
  posts: PostMeta[];
};
