import { PostMeta } from "../../util";
import PostListItem from "./PostListItem";

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="mx-auto mt-24 space-y-6 sm:max-w-xl sm:space-y-12">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </div>
  );
}

export type PostListProps = {
  posts: PostMeta[];
};
