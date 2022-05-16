import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostBySlug, getPostSlugs, PostMeta } from "../../posts";
import { useMemo } from "react";
import {
  CommonPageProps,
  getCommonPageProps,
  getPreviewBranch,
  PreviewData,
} from "../../util";
import { Layout } from "../../layout";
import { markdownToHtml } from "../../blog/post/transform/markdown-to-html";
import { Header } from "../../blog/post/header";
import { PostContent } from "../../blog/post/post-content";
import { PostFrontMatter } from "../../blog/post/post-front-matter";
import { PostContainer } from "../../blog/post/post-container";
import { getPostPath } from "../../urls";
import { htmlToReact } from "../../blog/post/transform/html-to-react";

const PostPage: NextPage<PostPageProps> = ({ post, html, layoutProps }) => {
  const content = useMemo(() => htmlToReact(html), [html]);

  return (
    <Layout
      {...layoutProps}
      pageHeadProps={{
        title: `${post.title} \u00B7 ${post.kicker}`,
        description: post.description,
        path: getPostPath(post.slug),
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
