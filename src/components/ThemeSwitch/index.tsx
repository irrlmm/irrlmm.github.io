import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SVG_MOON,
  SVG_MOON_AUTO,
  SVG_SUN,
  SVG_SUN_AUTO,
} from "../../consts/svg";
import DialButton from "../DialButton";

type Theme = "auto" | "dark" | "light";

const SLOT_COUNT = 10;

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "auto";
  const stored = localStorage.getItem("theme");
  return stored === "dark" || stored === "light" || stored === "auto"
    ? stored
    : "auto";
};

const getInitialPrefersDark = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [prefersDark, setPrefersDark] = useState(getInitialPrefersDark);

  const applyTheme = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDark(mediaQuery.matches);

    const onChange = () => {
      setPrefersDark(mediaQuery.matches);
      if ((localStorage.getItem("theme") || "auto") === "auto") {
        applyTheme("auto");
      }
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const otherTheme: Theme = prefersDark ? "light" : "dark";
  const cycle: Theme[] = ["auto", otherTheme];
  const activeTheme: Theme = cycle.includes(theme) ? theme : "auto";

  useEffect(() => {
    if (theme !== activeTheme) {
      setTheme(activeTheme);
      localStorage.setItem("theme", activeTheme);
      applyTheme(activeTheme);
    }
  }, [theme, activeTheme]);

  const onClick = () => {
    const index = cycle.indexOf(activeTheme);
    const next = cycle[(index + 1) % cycle.length];
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const getIconPath = (slotTheme: Theme) => {
    if (slotTheme === "auto") {
      return prefersDark ? SVG_MOON_AUTO : SVG_SUN_AUTO;
    }
    return slotTheme === "dark" ? SVG_MOON : SVG_SUN;
  };

  return (
    <DialButton
      slotCount={SLOT_COUNT}
      activeSlot={activeTheme === "auto" ? 0 : 1}
      onStep={onClick}
      ariaLabel={`Theme: ${activeTheme}`}
    >
      {({ slotIndex, slotAngle, dialRotate, hovered }) => {
        let slotTheme: Theme | undefined;

        if (slotIndex === 0) slotTheme = "auto";
        if (slotIndex === 1) slotTheme = otherTheme;

        if (!slotTheme) return null;

        const isActive = slotTheme === activeTheme;
        const spokeRotate = -1 * (dialRotate + slotAngle);

        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="var(--icon-size)"
            height="var(--icon-size)"
            strokeWidth="1.5"
            stroke="var(--on-surface)"
            initial={false}
            animate={{
              rotate: spokeRotate,
              opacity: isActive ? 1 : hovered ? 0.5 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <path
              d={getIconPath(slotTheme)}
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>
        );
      }}
    </DialButton>
  );
};

export default ThemeSwitch;
