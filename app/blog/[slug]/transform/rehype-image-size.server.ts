import { selectAll } from "hast-util-select";
import { Plugin } from "unified";
import type { Root } from "hast";
import probe from "probe-image-size";

export const rehypeImageSize: Plugin<Array<void>, Root> = () => {
  return async (tree) => {
    const images = selectAll("img", tree);

    await Promise.all(
      images.map(async (image) => {
        if (!image.properties?.src || typeof image.properties.src !== "string")
          throw new Error("Image does not have src!");

        const { width, height } = await probe(image.properties.src);
        image.properties.width = width;
        image.properties.height = height;
      })
    );
  };
};
