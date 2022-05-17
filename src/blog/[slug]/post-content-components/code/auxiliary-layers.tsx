import { cn } from "../../../../shared/classnames";

export function BackgroundLayer({
  className,
  lineNumbers,
  highlightedLines,
}: BackgroundLayerProps) {
  return (
    <AuxiliaryLayer
      className={className}
      highlightedLineClassName="border-l-4 border-sky-400 bg-slate-700 dark:bg-slate-800"
      lineNumbers={lineNumbers}
      highlightedLines={highlightedLines}
    />
  );
}

export type BackgroundLayerProps = {
  className: string;
  lineNumbers: number[];
  highlightedLines: Set<number> | null;
};

export function FadeOutLayer({
  className,
  lineNumbers,
  highlightedLines,
}: FadeOutLayerProps) {
  return (
    <AuxiliaryLayer
      className={className}
      nonHighlightedClassName="bg-slate-800 opacity-40 dark:bg-black"
      lineNumbers={lineNumbers}
      highlightedLines={highlightedLines}
    />
  );
}

export type FadeOutLayerProps = {
  className: string;
  lineNumbers: number[];
  highlightedLines: Set<number>;
};

function AuxiliaryLayer({
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

type AuxiliaryLayerProps = {
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
