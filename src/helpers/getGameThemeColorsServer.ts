import {
  argbFromRgb,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  QuantizerCelebi,
  redFromArgb,
  Score,
  TonalPalette,
} from "@material/material-color-utilities";
import path from "node:path";
import sharp from "sharp";
import type { CardGameThemeByMode } from "../types/content";

const MAX_QUANTIZED_COLORS = 8;

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

const getGameThemeColorsServer = async (
  coverImage: string,
): Promise<CardGameThemeByMode> => {
  try {
    const imagePath = path.join(
      process.cwd(),
      "assets",
      coverImage.replace(/^\//, ""),
    );

    const { data, info } = await sharp(imagePath)
      .ensureAlpha()
      .resize(64)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const top = getTopQuantizedColor(data, info.channels);

    const source = Hct.fromInt(
      argbFromRgb(redFromArgb(top), greenFromArgb(top), blueFromArgb(top)),
    );

    const lightPalette = TonalPalette.fromHct(Hct.from(source.hue, 4, 2));
    const lightAccentPalette = TonalPalette.fromHct(
      Hct.from(source.hue + 60, 80, source.chroma),
    );

    const darkPalette = TonalPalette.fromHct(Hct.from(source.hue, 3, 20));
    const darkAccentPalette = TonalPalette.fromHct(
      Hct.from(source.hue + 60, 80, source.chroma),
    );

    const getTone = (palette: TonalPalette, tone: number) => {
      return hexFromArgb(palette.getHct(tone).toInt());
    };

    return {
      dark: {
        "--surface": getTone(darkPalette, 10),
        "--surface-container": getTone(darkPalette, 15),
        "--on-surface": getTone(darkPalette, 90),
        "--outline": getTone(darkPalette, 20),
        "--primary": getTone(darkAccentPalette, 90),
        "--on-primary": getTone(darkAccentPalette, 10),
      },
      light: {
        "--surface": getTone(lightPalette, 93),
        "--surface-container": getTone(lightPalette, 88),
        "--on-surface": getTone(lightPalette, 22),
        "--outline": getTone(lightPalette, 46),
        "--primary": getTone(lightAccentPalette, 40),
        "--on-primary": getTone(lightAccentPalette, 95),
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Failed to generate game theme colors for "${coverImage}": ${errorMessage}`,
    );
  }
};

export default getGameThemeColorsServer;
