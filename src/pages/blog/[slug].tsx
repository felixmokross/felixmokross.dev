import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostBySlug, getPostSlugs } from "../../shared/posts.server";
import { useMemo } from "react";
import {
  CommonPageProps,
  getPreviewBranch,
  PreviewData,
} from "../../shared/util.server";
import { markdownToHtml } from "../../blog/[slug]/transform/markdown-to-html.server";
import { Header } from "../../blog/[slug]/header";
import { PostContent } from "../../blog/[slug]/post-content";
import { PostFrontMatter } from "../../blog/[slug]/post-front-matter";
import { PostContainer } from "../../blog/[slug]/post-container";
import { htmlToReact } from "../../blog/[slug]/transform/html-to-react";
import { PostMeta } from "../../shared/types";
import { getPostPath } from "../../shared/urls";

const PostPage: NextPage<PostPageProps> = ({ post, html }) => {
  const content = useMemo(() => htmlToReact(html), [html]);

  return (
    <>
      <Header />
      <PostContainer>
        <PostFrontMatter post={post} />
        <PostContent content={content} />
      </PostContainer>
    </>
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
      layoutProps: {
        pageHeadProps: {
          title: `${post.title} \u00B7 ${post.kicker}`,
          description: post.description,
          path: getPostPath(post.slug),
          image: {
            url: post.imageUrl,
            alt: "Blog post preview",
          },
          includeCreator: true,
        },
        previewBranch: getPreviewBranch(context),
      },
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
