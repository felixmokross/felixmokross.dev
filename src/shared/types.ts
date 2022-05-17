export type PostMeta = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  lastModified: string;
  description: string;
  imageUrl: string;
};

export type Post = PostMeta & { content: string };
