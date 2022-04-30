import AuxiliaryLayer from "./AuxiliaryLayer";

export default function FadeOutLayer({
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
