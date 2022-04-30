import { cn } from "../../../util";

export default function AuxiliaryLayer({
  className,
  highlightedLineClassName = "",
  nonHighlightedClassName = "",
  lineNumbers,
  highlightedLines,
}: AuxiliaryLayerProps) {
  return (
    <pre
      className={cn("pointer-events-none select-none", className)}
      aria-hidden={true}
    >
      {lineNumbers.map((ln) => {
        const highlighted = !!highlightedLines && highlightedLines.has(ln);
        return (
          <LinePlaceholder
            key={ln}
            className={
              highlighted ? highlightedLineClassName : nonHighlightedClassName
            }
          />
        );
      })}
    </pre>
  );
}

export type AuxiliaryLayerProps = {
  className: string;
  highlightedLineClassName?: string;
  nonHighlightedClassName?: string;
  lineNumbers: number[];
  highlightedLines: Set<number> | null;
};

function LinePlaceholder({ className }: LinePlaceholderProps) {
  return (
    <>
      <span className={cn("inline-block w-full", className)}> </span>
      {"\n"}
    </>
  );
}

type LinePlaceholderProps = {
  className: string;
};
