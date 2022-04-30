import AuxiliaryLayer from "./AuxiliaryLayer";

export default function BackgroundLayer({
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
