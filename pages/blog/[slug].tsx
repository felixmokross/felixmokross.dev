import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllPosts, getPostBySlug } from "../../src/posts";
import { useMemo } from "react";
import {
  alternateSiteTitle,
  baseUrl,
  getTitle,
  PostMeta,
} from "../../src/util";
import Layout from "../../src/Layout";
import Head from "next/head";
import Link from "next/link";
import PostBackgroundPattern from "../../src/blog/post/PostBackgroundPattern";
import PostMetaDisplay from "../../src/blog/post/PostMetaDisplay";
import { htmlToReact, markdownToHtml } from "../../src/blog/post/transform";

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

      <div className="mx-auto flex max-w-3xl justify-center px-6">
        <div>
          <Link href="/">
            <a className="flex items-center py-8 text-slate-800 hover:underline dark:text-slate-100">
              <h1 className="flex items-baseline space-x-4 text-2xl font-bold tracking-tight">
                {alternateSiteTitle}
              </h1>
            </a>
          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden bg-white pt-12 pb-16 dark:bg-slate-900">
        <PostBackgroundPattern />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1 className="mt-8">
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-500">
                {post.kicker}
              </span>
              <span className="mt-4 block text-center text-3xl font-extrabold leading-8 tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {post.title}
              </span>
            </h1>
            <PostMetaDisplay post={post} />
            <p className="mt-6 text-xl leading-8 text-slate-500 dark:text-slate-300">
              {post.description}
            </p>
          </div>
          <div className="prose prose-lg prose-slate prose-sky mx-auto mt-6 text-slate-500 dark:prose-invert dark:text-slate-300">
            {content}

            <hr />
            <p className="inline-flex w-full justify-around">
              <Link href="/blog">
                <a>&larr; {alternateSiteTitle}</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
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
  PostPageParams
> = async ({ params, preview }) => {
  if (!params) throw new Error("No params");
  const post = await getPostBySlug(params.slug, preview);

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
