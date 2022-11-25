import { getAllPosts } from "../../src/shared/posts.server";
import { previewData } from "next/headers";
import { HomeContainer } from "./home-container";
import { Bio } from "./bio";
import { PostList } from "./post-list";
import { PreviewData } from "../../src/shared/util.server";

export default async function Page() {
  const preview = previewData() as PreviewData;
  const posts = await getAllPosts(preview.branch);

  return (
    <HomeContainer>
      <Bio />
      <PostList posts={posts} />
    </HomeContainer>
  );
}
