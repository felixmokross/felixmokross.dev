import type { GetStaticProps, NextPage } from "next";
import {
  CommonPageProps,
  getCommonPageProps,
  getPreviewBranch,
  PreviewData,
} from "../../src/util";
import { Layout } from "../../src/layout";
import { getAllPosts, PostMeta } from "../../src/posts";
import { ParsedUrlQuery } from "querystring";
import PostList from "../../src/blog/home/post-list";
import { HomeContainer } from "../../src/blog/home/home-container";
import Bio from "../../src/blog/home/bio";

export const homePageLastModified = "2022-04-30";

const HomePage: NextPage<HomePageProps> = ({ posts, layoutProps }) => {
  return (
    <Layout
      {...layoutProps}
      head={{
        title: "Blog",
        description:
          "Zurich-based software engineer \u00B7 Lead Architect at Zühlke \u00B7 I'm passionate about web development and UX. On this blog I explore working with technologies like React, Next.js, and TypeScript.",
        path: "/blog",
      }}
    >
      <HomeContainer>
        <Bio />
        <PostList posts={posts} />
      </HomeContainer>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<
  HomePageProps,
  ParsedUrlQuery,
  PreviewData
> = async (context) => {
  const previewBranch = getPreviewBranch(context);
  const posts = await getAllPosts(previewBranch);

  return { props: { ...getCommonPageProps(context), posts } };
};

export default HomePage;

type HomePageProps = CommonPageProps & {
  posts: PostMeta[];
};
