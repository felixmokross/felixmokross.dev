import type { GetStaticProps, NextPage } from "next";
import {
  CommonPageProps,
  getCommonPageProps,
  getPreviewBranch,
  PreviewData,
} from "../../util.server";
import { Layout } from "../../layout";
import { getAllPosts } from "../../posts.server";
import { ParsedUrlQuery } from "querystring";
import PostList from "../../blog/index/post-list";
import { HomeContainer } from "../../blog/index/home-container";
import Bio from "../../blog/index/bio";
import { PostMeta } from "../../types";

export const homePageLastModified = "2022-04-30";

const HomePage: NextPage<HomePageProps> = ({ posts, layoutProps }) => {
  return (
    <Layout
      {...layoutProps}
      pageHeadProps={{
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
