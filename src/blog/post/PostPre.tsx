import { ReactElement } from "react";
import Code, { Language } from "./Code";

export default function PostPre({ children }: PostPreProps) {
  if (!Array.isArray(children) || !children[0])
    throw new Error("pre is not a valid code block");
  const code = children[0] as ReactElement<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  >;

  const match = /language-(.+)/.exec(code.props.className || "");
  if (!match) throw new Error("Language must be specified!");
  const [language, filename, highlightedLines] = match[1].split(":");

  return (
    <Code
      language={language as Language}
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
