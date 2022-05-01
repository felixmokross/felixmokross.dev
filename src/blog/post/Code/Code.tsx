import range from "lodash/range";
import BackgroundLayer from "./BackgroundLayer";
import CodeLayer from "./CodeLayer";
import FadeOutLayer from "./FadeOutLayer";
import FilenameBar from "./FilenameBar";
import hljs from "highlight.js/lib/core";
import hljsJson from "highlight.js/lib/languages/json";
import hljsJavascript from "highlight.js/lib/languages/javascript";
import hljsTypeScript from "highlight.js/lib/languages/typescript";
import hljsShell from "highlight.js/lib/languages/shell";
import hljsBash from "highlight.js/lib/languages/bash";
import hljsCss from "highlight.js/lib/languages/css";
import hljsXml from "highlight.js/lib/languages/xml";
import hljsMarkdown from "highlight.js/lib/languages/markdown";

hljs.registerLanguage("json", hljsJson);
hljs.registerLanguage("javascript", hljsJavascript);
hljs.registerLanguage("typescript", hljsTypeScript);
hljs.registerLanguage("shell", hljsShell);
hljs.registerLanguage("bash", hljsBash);
hljs.registerLanguage("css", hljsCss);
hljs.registerLanguage("xml", hljsXml);
hljs.registerLanguage("markdown", hljsMarkdown);

export type CodeProps = {
  children: string;
  language: Language;
  highlightedLines?: string;
  filename?: string;
};

export type Language =
  | "json"
  | "javascript"
  | "typescript"
  | "tsx"
  | "shell"
  | "css"
  | "html"
  | "md";

export default function Code({
  children,
  language,
  filename,
  highlightedLines,
}: CodeProps) {
  const lineNumbers = getLineNumbers(children);
  const _highlightedLines = parseLineRanges(highlightedLines);
  return (
    <div className="not-prose my-8 rounded-md bg-slate-800 text-sm leading-loose dark:bg-black dark:bg-opacity-50">
      {filename && <FilenameBar>{filename}</FilenameBar>}
      <div className="relative">
        <BackgroundLayer
          className="py-4"
          lineNumbers={lineNumbers}
          highlightedLines={_highlightedLines}
        />
        <CodeLayer className="absolute top-0 w-full py-4" language={language}>
          {children}
        </CodeLayer>
        {_highlightedLines && (
          <FadeOutLayer
            className="absolute top-0 w-full py-4"
            lineNumbers={lineNumbers}
            highlightedLines={_highlightedLines}
          />
        )}
      </div>
    </div>
  );
}

function getLineNumbers(code: string): number[] {
  return code.split("\n").map((_, index) => index + 1);
}

function parseLineRanges(
  lineRangesRaw: string | undefined
): Set<number> | null {
  if (!lineRangesRaw) {
    return null;
  }

  return new Set(lineRangesRaw.split(",").flatMap(parseLineRange));
}

function parseLineRange(lineRangeRaw: string): number[] {
  let [begin, end] = lineRangeRaw.trim().split("-");
  if (!end) end = begin;

  return range(Number(begin), Number(end) + 1);
}
