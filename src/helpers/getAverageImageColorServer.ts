import {
  argbFromRgb,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  QuantizerCelebi,
  redFromArgb,
  Score,
} from "@material/material-color-utilities";
import path from "node:path";
import sharp from "sharp";

export type ImageColors = {
  gloom: string;
  shadow: string;
};

const DEFAULT_COLORS: ImageColors = {
  gloom: "#ffffff",
  shadow: "#000000",
};

const MAX_QUANTIZED_COLORS = 8;

const getHctColors = (r: number, g: number, b: number): ImageColors => {
  const sourceHue = Hct.fromInt(argbFromRgb(r, g, b)).hue;

  const chroma = 35;

  const gloom = Hct.from(sourceHue, chroma, 95).toInt();
  const shadow = Hct.from(sourceHue, chroma, 15).toInt();

  return {
    gloom: hexFromArgb(gloom),
    shadow: hexFromArgb(shadow),
  };
};

const getTopQuantizedColor = (data: Buffer, channels: number): number => {
  const pixels: number[] = [];

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = channels > 3 ? data[i + 3] : 255;

    if (a < 255) {
      continue;
    }

    pixels.push(argbFromRgb(r, g, b));
  }

  if (pixels.length === 0) {
    throw new Error("No opaque pixels found in image");
  }

  const result = QuantizerCelebi.quantize(pixels, MAX_QUANTIZED_COLORS);
  const ranked = Score.score(result);
  const top = ranked[0];

  if (top === undefined) {
    throw new Error("Could not score quantized image colors");
  }

  return top;
};

const getAverageImageColorServer = async (imageSrc: string) => {
  try {
    const imagePath = path.join(
      process.cwd(),
      "assets",
      imageSrc.replace(/^\//, ""),
    );
    const { data, info } = await sharp(imagePath)
      .ensureAlpha()
      .resize(64)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const top = getTopQuantizedColor(data, info.channels);

    return getHctColors(
      redFromArgb(top),
      greenFromArgb(top),
      blueFromArgb(top),
    );
  } catch {
    return DEFAULT_COLORS;
  }
};

export default getAverageImageColorServer;
