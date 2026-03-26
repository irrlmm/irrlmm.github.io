import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DEFAULT_PALETTE_ID, PALETTES, type PalettePreset } from "../../consts/palettes";
import { pew } from "../../helpers/motion";
import { applyThemeToRoot } from "../../helpers/themeTokens";
import DialButton from "../DialButton";

type Palette = PalettePreset;

const SLOT_COUNT = 12;
const PALETTE_STORAGE_KEY = "paletteColors";

const getPaletteAt = (index: number): Palette => PALETTES[index] ?? PALETTES[0];
const getNextIndex = (index: number): number => (index + 1) % PALETTES.length;

const applyPalette = (palette: Palette) => {
  applyThemeToRoot(document.documentElement, palette.theme);
};

const readStoredPaletteId = (raw: string | null): string | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return parsed;
  } catch {
    // Ignore malformed storage payloads.
  }

  return null;
};

const getInitialPaletteIndex = (): number => {
  if (typeof window === "undefined") return 0;

  const storedId = readStoredPaletteId(localStorage.getItem(PALETTE_STORAGE_KEY));
  if (!storedId) {
    const defaultIndex = PALETTES.findIndex((palette) => palette.id === DEFAULT_PALETTE_ID);
    return defaultIndex >= 0 ? defaultIndex : 0;
  }

  const index = PALETTES.findIndex((palette) => palette.id === storedId);
  return index >= 0 ? index : 0;
};

const PaletteSwitch = () => {
  const [activeIndex, setActiveIndex] = useState(getInitialPaletteIndex);
  const activePalette = getPaletteAt(activeIndex);

  useEffect(() => {
    applyPalette(activePalette);
  }, [activePalette]);

  const onClick = () => {
    const nextIndex = getNextIndex(activeIndex);
    const next = getPaletteAt(nextIndex);
    setActiveIndex(nextIndex);
    localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify(next.id));
    applyPalette(next);
  };

  return (
    <DialButton
      slotCount={SLOT_COUNT}
      activeSlot={activeIndex}
      onStep={onClick}
      ariaLabel={`Palette: ${activePalette.label}`}
    >
      {({ slotIndex, hovered, dialRotate, slotAngle }) => {
        const palette = PALETTES[slotIndex];
        if (!palette) return null;

        const isActive = slotIndex === activeIndex;
        const spokeRotate = -1 * (dialRotate + slotAngle);

        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="var(--icon-size)"
            height="var(--icon-size)"
            initial={false}
            animate={{
              rotate: spokeRotate,
              opacity: isActive ? 1 : hovered ? 0.5 : 0,
            }}
            transition={pew()}
          >
            <defs>
              <linearGradient
                id={`palette-grad-${slotIndex}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={palette.swatchA} />
                <stop offset="100%" stopColor={palette.swatchB} />
              </linearGradient>
            </defs>

            <circle
              cx="12"
              cy="12"
              r="8"
              fill={`url(#palette-grad-${slotIndex})`}
            />
          </motion.svg>
        );
      }}
    </DialButton>
  );
};

export default PaletteSwitch;
