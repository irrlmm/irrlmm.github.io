import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DialButton from "../DialButton";

type Palette = { a: string; b: string };

//
// Presets and storage

const SLOT_COUNT = 12;
const PALETTE_STORAGE_KEY = "paletteColors";
const PALETTES: Palette[] = [
  { a: "#ffffff", b: "#000000" }, // Mono (untouchable)
  { a: "#ececec", b: "#111111" },
  { a: "#e7eacd", b: "#010018" },
];

//
// Helpers

const paletteKey = (a: string, b: string) => `${a}|${b}`;

// Returns a valid preset for any index value.
const getPaletteAt = (index: number): Palette => PALETTES[index] ?? PALETTES[0];

// Returns the next palette index in a circular manner.
const getNextIndex = (index: number): number => (index + 1) % PALETTES.length;

// Applies palette colors to root CSS variables used across the site.
const applyPalette = (palette: Palette) => {
  document.documentElement.style.setProperty("--root-color-a", palette.a);
  document.documentElement.style.setProperty("--root-color-b", palette.b);
};

// Restores initial preset index from localStorage with safe fallbacks.
const getInitialPaletteIndex = (): number => {
  // SSR has no localStorage.
  if (typeof window === "undefined") return 0;

  // Stored as JSON tuple: ["#colorA", "#colorB"].
  const raw = localStorage.getItem(PALETTE_STORAGE_KEY);
  if (!raw) return 0;

  try {
    const parsed = JSON.parse(raw);
    // Accept only two string values.
    if (!Array.isArray(parsed) || parsed.length !== 2) return 0;

    const [a, b] = parsed;
    if (typeof a !== "string" || typeof b !== "string") return 0;

    const storedKey = paletteKey(a, b);
    const index = PALETTES.findIndex(
      (palette) => paletteKey(palette.a, palette.b) === storedKey,
    );
    return index >= 0 ? index : 0;
  } catch {
    // Invalid JSON should never break rendering.
    return 0;
  }
};

const PaletteSwitch = () => {
  const [activeIndex, setActiveIndex] = useState(getInitialPaletteIndex);
  const activePalette = getPaletteAt(activeIndex);

  // Ensure persisted palette is applied when component mounts.
  useEffect(() => {
    applyPalette(activePalette);
  }, []);

  const onClick = () => {
    const nextIndex = getNextIndex(activeIndex);
    const next = getPaletteAt(nextIndex);
    setActiveIndex(nextIndex);
    localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify([next.a, next.b]));
    applyPalette(next);
  };

  return (
    <DialButton
      slotCount={SLOT_COUNT}
      activeSlot={activeIndex}
      onStep={onClick}
      ariaLabel={`Palette: ${activePalette.a} to ${activePalette.b}`}
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
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <defs>
              <linearGradient
                id={`palette-grad-${slotIndex}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={palette.a} />
                <stop offset="100%" stopColor={palette.b} />
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
