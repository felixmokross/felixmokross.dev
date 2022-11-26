import { getAllPosts } from "../../src/shared/posts.server";
import { HomeContainer } from "./home-container";
import { Bio } from "./bio";
import { PostList } from "./post-list";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <HomeContainer>
      <Bio />
      <PostList posts={posts} />
    </HomeContainer>
  );
}
