import Image from "next/legacy/image";

export function PostImage({ src, alt, width, height }: PostImageProps) {
  if (!src) throw new Error("No src!");
  if (!alt) throw new Error("No alt!");
  const altParts = alt.split("|");
  const priority = altParts[1]?.trim() === "priority";

  return (
    <span className="inline-flex w-full justify-center">
      <Image
        src={src}
        alt={altParts[0].trim()}
        width={typeof width === "string" ? parseInt(width) : width}
        height={typeof height === "string" ? parseInt(height) : height}
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
  "src" | "alt" | "width" | "height"
>;
