const FALLBACK_COLOR = "rgb(0, 0, 0)";
const SAMPLE_SIZE = 64;

const getAverageImageColor = async (src: string): Promise<string> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const width = Math.max(1, Math.min(SAMPLE_SIZE, img.naturalWidth));
      const height = Math.max(1, Math.min(SAMPLE_SIZE, img.naturalHeight));
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        resolve(FALLBACK_COLOR);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const { data } = ctx.getImageData(0, 0, width, height);

      let r = 0;
      let g = 0;
      let b = 0;
      let pixelCount = 0;

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha === 0) continue;

        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        pixelCount += 1;
      }

      if (pixelCount === 0) {
        resolve(FALLBACK_COLOR);
        return;
      }

      resolve(
        `rgb(${Math.round(r / pixelCount)}, ${Math.round(g / pixelCount)}, ${Math.round(
          b / pixelCount,
        )})`,
      );
    };

    img.onerror = () => resolve(FALLBACK_COLOR);
    img.src = src;
  });

export default getAverageImageColor;
