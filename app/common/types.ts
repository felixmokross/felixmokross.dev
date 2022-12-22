export type PostMeta = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  lastModified: string;
  description: string;
  imageUrl: string;
  isHidden: boolean;
};

export type Post = PostMeta & { content: string };
