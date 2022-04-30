import Image from "next/image";

export default function PostImage({ src, alt }: PostImageProps) {
  if (!src) throw new Error("No src!");
  if (!alt) throw new Error("No alt!");
  const altParts = alt.split("|");
  const widthAndHeightParts = altParts[1].trim().split("x");
  const width = Number(widthAndHeightParts[0]);
  const height = Number(widthAndHeightParts[1]);
  const priority = altParts[2]?.trim() === "priority";

  return (
    <span className="inline-flex w-full justify-center">
      <Image
        src={src}
        alt={altParts[0].trim()}
        width={width}
        height={height}
        priority={priority}
      />
    </span>
  );
}

export type PostImageProps = Pick<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "src" | "alt"
>;
