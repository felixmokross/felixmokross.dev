import rehypeReact, { Options } from "rehype-react";
import rehypeParse from "rehype-parse";
import { createElement, Fragment } from "react";
import { PostImage } from "../post-content-components/post-image";
import { PostPre } from "../post-content-components/post-pre";
import {
  PostH2,
  PostH3,
  PostH4,
  PostH5,
  PostH6,
} from "../post-content-components/post-headings";
import { unified } from "unified";

export function htmlToReact(html: string) {
  return (
    unified()
      // rehype-dom-parse would be much smaller, however we need something which works also on server-side
      // for simplicity we don't distinguish between server-side and client-side
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, rehypeReactOptions)
      .processSync(html).result
  );
}

const rehypeReactOptions: Options = {
  createElement,
  Fragment,
  components: {
    img: PostImage,
    pre: PostPre,
    h2: PostH2,
    h3: PostH3,
    h4: PostH4,
    h5: PostH5,
    h6: PostH6,
  },
};
