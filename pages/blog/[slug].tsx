import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostBySlug, getPostSlugs, PostMeta } from "../../src/posts";
import { useMemo } from "react";
import {
  CommonPageProps,
  getCommonPageProps,
  getPreviewBranch,
  PreviewData,
} from "../../src/util";
import { Layout } from "../../src/layout";
import { htmlToReact, markdownToHtml } from "../../src/blog/post/transform";
import { Header } from "../../src/blog/post/header";
import { PostContent } from "../../src/blog/post/post-content";
import { PostFrontMatter } from "../../src/blog/post/post-front-matter";
import { PostContainer } from "../../src/blog/post/post-container";

const PostPage: NextPage<PostPageProps> = ({ post, html, layoutProps }) => {
  const content = useMemo(() => htmlToReact(html), [html]);

  return (
    <Layout
      {...layoutProps}
      pageHeadProps={{
        title: `${post.title} \u00B7 ${post.kicker}`,
        description: post.description,
        path: `/blog/${post.slug}`,
        image: {
          url: post.imageUrl,
          alt: "Blog post preview",
        },
        includeCreator: true,
      }}
    >
      <Header />
      <PostContainer>
        <PostFrontMatter post={post} />
        <PostContent content={content} />
      </PostContainer>
    </Layout>
  );
};

type PostPageProps = CommonPageProps & {
  post: PostMeta;
  html: string;
};

type PostPageParams = {
  slug: string;
};

export default PostPage;

export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  const slugs = await getPostSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageParams,
  PreviewData
> = async (context) => {
  if (!context.params) throw new Error("No params");
  const previewBranch = getPreviewBranch(context);
  const post = await getPostBySlug(context.params.slug, previewBranch);

  return {
    props: {
      ...getCommonPageProps(context),
      post: {
        slug: post.slug,
        imageUrl: post.imageUrl,
        title: post.title,
        kicker: post.kicker,
        date: post.date,
        lastModified: post.lastModified,
        description: post.description,
      },
      html: await markdownToHtml(post.content),
    },
  };
};
