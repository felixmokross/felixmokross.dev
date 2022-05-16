import { unified } from "unified";

export async function markdownToHtml(markdown: string) {
  const { default: remarkParse } = await import("remark-parse");
  const { default: remarkRehype } = await import("remark-rehype");
  const { default: rehypeRaw } = await import("rehype-raw");
  const { default: rehypeSlug } = await import("rehype-slug");
  const { default: rehypeSanitize, defaultSchema } = await import(
    "rehype-sanitize"
  );
  const { default: rehypeStringify } = await import("rehype-stringify");
  const { rehypeImageSize } = await import("./rehype-image-size");

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
