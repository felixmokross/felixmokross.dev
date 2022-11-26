import { ReactElement } from "react";
import { Code, Language } from "./code";

export function PostPre({ children }: PostPreProps) {
  if (!Array.isArray(children) || !children[0])
    throw new Error("pre is not a valid code block");
  const code = children[0] as ReactElement<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  >;

  const match = /language-(.+)/.exec(code.props.className || "");
  const [language, filename, highlightedLines] = match
    ? match[1].split(":")
    : [undefined, undefined, undefined];

  return (
    <Code
      language={language as Language | undefined}
      filename={filename}
      highlightedLines={highlightedLines}
    >
      {(code.props.children as string[])[0].trim()}
    </Code>
  );
}

export type PostPreProps = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
  "children"
>;
