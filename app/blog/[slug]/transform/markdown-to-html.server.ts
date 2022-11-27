import "server-only";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { rehypeImageSize } from "./rehype-image-size.server";

export async function markdownToHtml(markdown: string) {
  return String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeSanitize, {
        ...defaultSchema,
        clobberPrefix: "",
        attributes: {
          ...defaultSchema.attributes,
          code: [...(defaultSchema.attributes?.code || []), "className"],
        },
      })
      .use(rehypeImageSize)
      .use(rehypeStringify)
      .process(markdown)
  );
}
