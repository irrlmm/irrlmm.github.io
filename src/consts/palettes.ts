import { opacityToHex } from "../helpers/opacityToHex";
import type { Theme } from "../helpers/themeTokens";

export type PalettePreset = {
  id: string;
  theme: Theme;
};

export const PALETTES: PalettePreset[] = [
  {
    id: "mono",
    theme: {
      light: {
        "surface-container": "#ffffff",
        background: "#f6f6f6",
        surface: "#eeeeee",
        "on-surface": "#0b0b0b",
        outline: opacityToHex("#333333", 0.5),
        primary: "#000000",
        "on-primary": "#ffffff",
        shadow: "#131313",
      },
      dark: {
        "surface-container": "#1f1f1f",
        background: "#131313",
        surface: "#191919",
        "on-surface": "#ffffff",
        outline: opacityToHex("#cccccc", 0.5),
        primary: "#ffffff",
        "on-primary": "#131313",
        shadow: "#000000",
      },
    },
  },
  {
    id: "ember",
    theme: {
      light: {
        "surface-container": "#fff8f1",
        background: "#fff1e6",
        surface: "#ffe6d4",
        "on-surface": "#2f0902",
        outline: "#8b3a22",
        primary: "#8b1f00",
        "on-primary": "#fff1e6",
        shadow: "#170400",
      },
      dark: {
        "surface-container": "#2a0d08",
        background: "#170502",
        surface: "#220a05",
        "on-surface": "#ffd9c8",
        outline: "#ff8b5c",
        primary: "#ff8b5c",
        "on-primary": "#170502",
        shadow: "#000000",
      },
    },
  },
  {
    id: "acid",
    theme: {
      light: {
        "surface-container": "#f2fff8",
        background: "#e9fff3",
        surface: "#dcffe9",
        "on-surface": "#043124",
        outline: "#0f7c59",
        primary: "#007f57",
        "on-primary": "#e9fff3",
        shadow: "#00150e",
      },
      dark: {
        "surface-container": "#063128",
        background: "#021b15",
        surface: "#04241c",
        "on-surface": "#cbffe0",
        outline: "#43d19b",
        primary: "#43d19b",
        "on-primary": "#021b15",
        shadow: "#000000",
      },
    },
  },
  {
    id: "ultraviolet",
    theme: {
      light: {
        "surface-container": "#fbf6ff",
        background: "#f3e9ff",
        surface: "#e8d7ff",
        "on-surface": "#1e0630",
        outline: "#6f36a2",
        primary: "#6b19ad",
        "on-primary": "#f3e9ff",
        shadow: "#0f0417",
      },
      dark: {
        "surface-container": "#211033",
        background: "#12041d",
        surface: "#1a0a29",
        "on-surface": "#f1ddff",
        outline: "#b778ff",
        primary: "#b778ff",
        "on-primary": "#12041d",
        shadow: "#000000",
      },
    },
  },
  {
    id: "sea",
    theme: {
      light: {
        "surface-container": "#f2fdff",
        background: "#e6f9ff",
        surface: "#d8f3ff",
        "on-surface": "#03243b",
        outline: "#0b5f8c",
        primary: "#0069a3",
        "on-primary": "#e6f9ff",
        shadow: "#001422",
      },
      dark: {
        "surface-container": "#07253a",
        background: "#021626",
        surface: "#052033",
        "on-surface": "#c8f4ff",
        outline: "#55b8e8",
        primary: "#55b8e8",
        "on-primary": "#021626",
        shadow: "#000000",
      },
    },
  },
];

export const DEFAULT_PALETTE_ID = PALETTES[0]?.id ?? "mono";

export const PALETTE_THEMES_BY_ID = Object.fromEntries(
  PALETTES.map((palette) => [palette.id, palette.theme]),
) as Record<string, Theme>;
