import orderBy from "lodash/orderBy";
import matter from "gray-matter";
import { PostMeta, postDateFormat } from "./util";
import dayjs from "dayjs";

export async function getPostBySlug(
  slug: string,
  preview = false
): Promise<Post> {
  const fileContents = await getPostContentFromGitHub(slug, preview);
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

export async function getAllPosts(preview = false): Promise<PostMeta[]> {
  const filenames = await getPostSlugsFromGitHub(preview);

  const posts = new Array<PostMeta>(filenames.length);
  for (let i = 0; i < posts.length; i++) {
    const post = await getPostBySlug(filenames[i], preview);

    posts[i] = {
      slug: post.slug,
      title: post.title,
      kicker: post.kicker,
      date: post.date,
      lastModified: post.lastModified,
      description: post.description,
      imageUrl: post.imageUrl,
    };
  }

  return orderBy(posts, (p) => p.date, "desc");
}

async function getPostSlugsFromGitHub(preview: boolean) {
  const branchName = preview ? "preview" : "main";

  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_CONTENT_REPO}/contents/posts?ref=${branchName}`,
    {
      headers: {
        Authorization: basicAuth(
          process.env.GITHUB_USERNAME!,
          process.env.GITHUB_TOKEN!
        ),
      },
    }
  );
  if (response.status !== 200) throw new Error(response.status.toString());

  return ((await response.json()) as GithubItem[]).map((item) => item.name);

  type GithubItem = {
    name: string;
  };
}

async function getPostContentFromGitHub(slug: string, preview: boolean) {
  const branchName = preview ? "preview" : "main";

  const response = await fetch(
    `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_CONTENT_REPO}/${branchName}/posts/${slug}/post.md`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.GITHUB_USERNAME}:${process.env.GITHUB_TOKEN}`
        ).toString("base64")}`,
      },
    }
  );
  if (response.status !== 200) throw new Error(response.status.toString());

  return await response.text();
}

function basicAuth(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

export type Post = PostMeta & { content: string };
