import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";
import getImageMetadata from "./getImageMetadata";

export type OptimizedImageResult = GetImageResult & {
  width: number;
  height: number;
};

const getOptimizedImage = async (
  src: string,
  width?: number,
): Promise<OptimizedImageResult> => {
  try {
    const imageMetadata = await getImageMetadata(src)();
    const image = imageMetadata.default;

    const optimizedImage = await getImage({
      src: image,
      format: image.format === "svg" ? "svg" : "webp",
      quality: 99,
      width: width || 2560,
    });

    return {
      ...optimizedImage,
      width: image.width,
      height: image.height,
    };
  } catch (error) {
    throw new Error(`Failed to optimize image: ${error}`);
  }
};

export default getOptimizedImage;
