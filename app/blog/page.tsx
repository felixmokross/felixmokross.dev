import { getAllPosts } from "../../src/shared/posts.server";
import { HomePage } from "./home-page";
import { previewData } from "next/headers";

export default async function Page() {
  const preview = previewData();
  const posts = await getAllPosts(preview.branch);

  return <HomePage posts={posts} />;
}
