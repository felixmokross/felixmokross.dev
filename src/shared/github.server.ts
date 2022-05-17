if (
  !process.env.GITHUB_USERNAME ||
  !process.env.GITHUB_CONTENT_REPO ||
  !process.env.GITHUB_TOKEN
)
  throw new Error("GitHub environment variables are not set!");

const username = process.env.GITHUB_USERNAME;
const contentRepo = process.env.GITHUB_CONTENT_REPO;
const token = process.env.GITHUB_TOKEN;

const apiBaseUrl = `https://api.github.com/repos/${encodeURIComponent(
  username
)}/${encodeURIComponent(contentRepo)}`;

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

export async function logMainBranchCommitFromGithub() {
  const response = await fetchFromGithub(`${apiBaseUrl}/branches/main`);

  const { commit } = (await response.json()) as Branch;

  console.log(
    `main branch commit: ${commit.sha}, ${commit.commit.author.date}, ${commit.commit.message}`
  );

  type Branch = {
    commit: {
      sha: string;
      commit: {
        author: { date: string };
        message: string;
      };
    };
  };
}

export async function getPostSlugsFromGithub(previewBranch: string | null) {
  const branchName = previewBranch || "main";

  const response = await fetchFromGithub(
    `${apiBaseUrl}/contents/posts?ref=${encodeURIComponent(branchName)}`
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
    `${apiBaseUrl}/contents/posts/${encodeURIComponent(
      slug
    )}/post.md?ref=${encodeURIComponent(branchName)}`
  );

  const item = (await response.json()) as GithubItem;
  console.log(`${slug} SHA: ${item.sha}`);

  return Buffer.from(item.content, "base64").toString();

  type GithubItem = {
    sha: string;
    content: string;
  };
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
