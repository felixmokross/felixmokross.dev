import "server-only";
import orderBy from "lodash/orderBy";
import matter from "gray-matter";
import dayjs from "dayjs";
import {
  getPostContentFromGithub,
  getPostSlugsFromGithub,
  logMainBranchCommitFromGithub,
} from "./github.server";
import { Post, PostMeta } from "./types";

const postDateFormat = "YYYY-MM-DD";

export async function getPostSlugs() {
  return await getPostSlugsFromGithub();
}

export async function getPostBySlug(slug: string): Promise<Post> {
  await logMainBranchCommitFromGithub();

  const fileContents = await getPostContentFromGithub(slug);
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

export async function getAllPosts(): Promise<PostMeta[]> {
  const filenames = await getPostSlugsFromGithub();

  const posts = (
    await Promise.all(filenames.map((filename) => getPostBySlug(filename)))
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
