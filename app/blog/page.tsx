import { getAllPosts } from "../../src/shared/posts.server";
import { previewData } from "next/headers";
import { HomeContainer } from "./home-container";
import { Bio } from "./bio";
import { PostList } from "./post-list";

export default async function Page() {
  const preview = previewData();
  const posts = await getAllPosts(preview.branch);

  return (
    <HomeContainer>
      <Bio />
      <PostList posts={posts} />
    </HomeContainer>
  );
}
