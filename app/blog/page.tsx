import { getAllPosts } from "../../src/shared/posts.server";
import { previewData } from "next/headers";
import { HomeContainer } from "../../src/blog/index/home-container";
import { Bio } from "../../src/blog/index/bio";
import { PostList } from "../../src/blog/index/post-list";

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
