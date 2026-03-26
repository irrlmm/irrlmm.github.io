const MIN_OPACITY = 0;
const MAX_OPACITY = 1;
const MAX_HEX_ALPHA = 255;
const HEX_RADIX = 16;
const SHORT_HEX_LENGTH = 3;
const HEX_COLOR_RE = /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

const normalizeHex = (hex: string): string => {
  if (!HEX_COLOR_RE.test(hex)) {
    throw new TypeError("Hex color must be in #RGB or #RRGGBB format.");
  }

  const sanitized = hex.replace("#", "").toUpperCase();
  const expanded =
    sanitized.length === SHORT_HEX_LENGTH
      ? sanitized
          .split("")
          .map((char) => char.repeat(2))
          .join("")
      : sanitized;

  return `#${expanded}`;
};

export const opacityToHex = (hex: string, opacity: number): string => {
  if (!Number.isFinite(opacity)) {
    throw new TypeError("Opacity must be a finite number.");
  }

  if (opacity < MIN_OPACITY || opacity > MAX_OPACITY) {
    throw new RangeError("Opacity must be between 0 and 1.");
  }

  const alpha = Math.round(opacity * MAX_HEX_ALPHA)
    .toString(HEX_RADIX)
    .padStart(2, "0")
    .toUpperCase();

  return `${normalizeHex(hex)}${alpha}`;
};
