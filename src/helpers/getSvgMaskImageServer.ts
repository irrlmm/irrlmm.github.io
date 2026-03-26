import getOptimizedImage from "./getOptimizedImage";

export type SvgMaskImage = {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
};

const getSvgMaskImageServer = async (
  src: string,
  optimizeWidth = 256,
): Promise<SvgMaskImage> => {
  const image = await getOptimizedImage(src, optimizeWidth);

  return {
    src: image.src,
    width: image.width,
    height: image.height,
    aspectRatio: image.width / image.height,
  };
};

export default getSvgMaskImageServer;
