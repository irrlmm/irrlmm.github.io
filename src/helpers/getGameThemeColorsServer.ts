import {
  Hct,
  SchemeTonalSpot,
  argbFromRgb,
  hexFromArgb,
  QuantizerCelebi,
  redFromArgb,
  greenFromArgb,
  blueFromArgb,
  Score,
} from "@material/material-color-utilities";
import path from "node:path";
import sharp from "sharp";
import type { CardGameThemeColors } from "../types/content";

const DEFAULT_GAME_THEME_COLORS: CardGameThemeColors = {
  primary: "#ffb59c",
  secondary: "#e7bdb0",
  surface: "#1a110f",
  surfaceDim: "#1a110f",
  onSurface: "#f1dfd9",
  onAccent: "#561f0b",
  outline: "#a08d86",
  overlayOnSurface: "color-mix(in srgb, #f1dfd9 6%, transparent)",
};

const MAX_QUANTIZED_COLORS = 8;
const GAME_THEME_IS_DARK = true;
const GAME_THEME_CONTRAST_LEVEL = 0;

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
): Promise<CardGameThemeColors> => {
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

    const scheme = new SchemeTonalSpot(
      source,
      GAME_THEME_IS_DARK,
      GAME_THEME_CONTRAST_LEVEL,
    );

    return {
      primary: hexFromArgb(scheme.primary),
      secondary: hexFromArgb(scheme.secondary),
      surface: hexFromArgb(scheme.surface),
      surfaceDim: hexFromArgb(scheme.surfaceDim),
      onSurface: hexFromArgb(scheme.onSurface),
      onAccent: hexFromArgb(scheme.onPrimary),
      outline: hexFromArgb(scheme.outline),
      overlayOnSurface: `color-mix(in srgb, ${hexFromArgb(scheme.onSurface)} 6%, transparent)`,
    };
  } catch {
    return DEFAULT_GAME_THEME_COLORS;
  }
};

export default getGameThemeColorsServer;
