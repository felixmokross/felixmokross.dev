import hljs from "highlight.js/lib/core";
import { useMemo } from "react";
import { cn } from "../../../util";

export default function CodeLayer({
  className,
  children,
  language,
}: CodeLayerProps) {
  const html = useMemo(
    () => (language ? hljs.highlight(children, { language }).value : null),
    [children, language]
  );

  return (
    <pre className={cn("overflow-x-auto px-4", className)}>
      {html ? (
        <code
          className="block text-slate-100"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <code className="block text-slate-100">{children}</code>
      )}
    </pre>
  );
}

export type CodeLayerProps = {
  className: string;
  children: string;
  language?: string;
};
