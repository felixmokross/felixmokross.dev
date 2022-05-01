import orderBy from "lodash/orderBy";
import matter from "gray-matter";
import { PostMeta, postDateFormat, basicAuth } from "./util";
import dayjs from "dayjs";

export async function getPostBySlug(
  slug: string,
  previewBranch: string | null = null
): Promise<Post> {
  const fileContents = await getPostContentFromGitHub(slug, previewBranch);
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
  const filenames = await getPostSlugsFromGitHub(previewBranch);

  const posts = new Array<PostMeta>(filenames.length);
  for (let i = 0; i < posts.length; i++) {
    const post = await getPostBySlug(filenames[i], previewBranch);

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

async function getPostSlugsFromGitHub(previewBranch: string | null) {
  const branchName = previewBranch || "main";

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

  if (response.status !== 200)
    throw new Error(`GitHub responded with ${response.status}`);

  return ((await response.json()) as GithubItem[]).map((item) => item.name);

  type GithubItem = {
    name: string;
  };
}

async function getPostContentFromGitHub(
  slug: string,
  previewBranch: string | null
) {
  const branchName = previewBranch || "main";

  const response = await fetch(
    `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_CONTENT_REPO}/${branchName}/posts/${slug}/post.md`,
    {
      headers: {
        Authorization: basicAuth(
          process.env.GITHUB_USERNAME!,
          process.env.GITHUB_TOKEN!
        ),
      },
    }
  );

  if (response.status !== 200)
    throw new Error(`GitHub responded with ${response.status}`);

  return await response.text();
}

export type Post = PostMeta & { content: string };
