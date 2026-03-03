import { getImage } from "astro:assets";
import getImageMetadata from "./getImageMetadata";

const getOptimizedImage = async (src: string, width?: number) => {
  try {
    const imageMetadata = await getImageMetadata(src)();
    const optimizedImage = await getImage({
      src: imageMetadata.default,
      format: "webp",
      quality: 95,
      width: width || 2560,
    });
    return optimizedImage;
  } catch (error) {
    throw new Error(`Failed to optimize image: ${error}`);
  }
};

export default getOptimizedImage;
