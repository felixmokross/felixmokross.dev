if (
  !process.env.GITHUB_USERNAME ||
  !process.env.GITHUB_CONTENT_REPO ||
  !process.env.GITHUB_TOKEN
)
  throw new Error("GitHub environment variables are not set!");

const username = process.env.GITHUB_USERNAME;
const contentRepo = process.env.GITHUB_CONTENT_REPO;
const token = process.env.GITHUB_TOKEN;

const apiBaseUrl = `https://api.github.com/repos/${username}/${contentRepo}`;
const rawBaseUrl = `https://raw.githubusercontent.com/${username}/${contentRepo}`;

const mainBranch = "main";

export async function getPreviewBranchesFromGithub() {
  const response = await fetchFromGithub(`${apiBaseUrl}/branches`);

  return ((await response.json()) as Branch[])
    .map((branch) => branch.name)
    .filter((b) => b !== mainBranch);

  type Branch = {
    name: string;
  };
}

export async function getPostSlugsFromGithub(previewBranch: string | null) {
  const branchName = previewBranch || "main";

  const response = await fetchFromGithub(
    `${apiBaseUrl}/contents/posts?ref=${branchName}`
  );

  return ((await response.json()) as GithubItem[]).map((item) => item.name);

  type GithubItem = {
    name: string;
  };
}

export async function getPostContentFromGithub(
  slug: string,
  previewBranch: string | null
) {
  const branchName = previewBranch || "main";

  const response = await fetchFromGithub(
    `${rawBaseUrl}/${branchName}/posts/${slug}/post.md`
  );

  return await response.text();
}

async function fetchFromGithub(url: string) {
  const response = await fetch(url, {
    headers: { Authorization: basicAuth(username, token) },
  });

  if (response.status !== 200)
    throw new Error(`GitHub responded with ${response.status}`);

  return response;
}

function basicAuth(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}
