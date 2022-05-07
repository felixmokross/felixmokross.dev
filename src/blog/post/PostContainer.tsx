import { PropsWithChildren } from "react";
import PostBackgroundPattern from "./PostBackgroundPattern";

export default function PostContainer({ children }: PropsWithChildren<{}>) {
  return (
    <main className="relative overflow-hidden bg-white pt-12 pb-16 dark:bg-slate-900">
      <PostBackgroundPattern />
      <article className="relative px-4 sm:px-6 lg:px-8">{children}</article>
    </main>
  );
}
