import orderBy from "lodash/orderBy";
import matter from "gray-matter";
import { PostMeta, postDateFormat } from "./util";
import dayjs from "dayjs";
import { getPostContentFromGithub, getPostSlugsFromGithub } from "./github";

export async function getPostBySlug(
  slug: string,
  previewBranch: string | null = null
): Promise<Post> {
  const fileContents = await getPostContentFromGithub(slug, previewBranch);
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title,
    kicker: data.kicker,
    date: dayjs(data.date).format(postDateFormat),
    lastModified: dayjs(data.lastModified).format(postDateFormat),
    description: data.description,
    imageUrl: data.imageUrl,
    content,
  };
}

export async function getAllPosts(
  previewBranch: string | null = null
): Promise<PostMeta[]> {
  const filenames = await getPostSlugsFromGithub(previewBranch);

  const posts = (
    await Promise.all(
      filenames.map((filename) => getPostBySlug(filename, previewBranch))
    )
  ).map((post) => ({
    slug: post.slug,
    title: post.title,
    kicker: post.kicker,
    date: post.date,
    lastModified: post.lastModified,
    description: post.description,
    imageUrl: post.imageUrl,
  }));

  return orderBy(posts, (p) => p.date, "desc");
}

export type Post = PostMeta & { content: string };
