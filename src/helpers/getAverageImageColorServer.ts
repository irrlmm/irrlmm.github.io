import path from "node:path";
import sharp from "sharp";

const DEFAULT_COLOR = "rgb(0, 0, 0)";

const getAverageImageColorServer = async (imageSrc: string) => {
  try {
    const imagePath = path.join(
      process.cwd(),
      "assets",
      imageSrc.replace(/^\//, ""),
    );
    const stats = await sharp(imagePath).stats();
    const [r, g, b] = stats.channels;

    return `rgb(${Math.round(r.mean)}, ${Math.round(g.mean)}, ${Math.round(
      b.mean,
    )})`;
  } catch {
    return DEFAULT_COLOR;
  }
};

export default getAverageImageColorServer;
