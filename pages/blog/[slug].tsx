import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllPosts, getPostBySlug } from "../../src/posts";
import { useMemo } from "react";
import { baseUrl, getTitle, PostMeta, PreviewData } from "../../src/util";
import Layout from "../../src/Layout";
import Head from "next/head";
import { htmlToReact, markdownToHtml } from "../../src/blog/post/transform";
import Header from "../../src/blog/post/Header";
import PostContent from "../../src/blog/post/PostContent";
import PostFrontMatter from "../../src/blog/post/PostFrontMatter";
import PostContainer from "../../src/blog/post/PostContainer";

const PostPage: NextPage<PostPageProps> = ({ post, html }) => {
  const content = useMemo(() => htmlToReact(html), [html]);

  const title = getTitle(`${post.title} \u00B7 ${post.kicker}`);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${baseUrl}/blog/${post.slug}`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Blog post preview" />
        <meta property="og:image:type" content="image/png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@felixmokross" />
      </Head>

      <Header />
      <PostContainer>
        <PostFrontMatter post={post} />
        <PostContent content={content} />
      </PostContainer>
    </Layout>
  );
};

type PostPageProps = {
  post: PostMeta;
  html: string;
};

type PostPageParams = {
  slug: string;
};

export default PostPage;

export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageParams,
  PreviewData
> = async ({ params, preview, previewData }) => {
  if (!params) throw new Error("No params");
  const post = await getPostBySlug(
    params.slug,
    preview && previewData ? previewData.branch : null
  );

  return {
    props: {
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
