import hljs from "highlight.js/lib/core";
import { useMemo } from "react";
import { cn } from "../../../util";

export default function CodeLayer({
  className,
  children,
  language,
}: CodeLayerProps) {
  const html = useMemo(
    () => hljs.highlight(children, { language }).value,
    [children, language]
  );

  return (
    <pre className={cn("px-4", className)}>
      <code
        className="block overflow-x-auto text-slate-100"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
}

export type CodeLayerProps = {
  className: string;
  children: string;
  language: string;
};
