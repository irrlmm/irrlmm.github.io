import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { pew } from "../../helpers/motion";
import DialButton from "../DialButton";
import { SVGS, type SvgName } from "../Svg";

type ColorScheme = "auto" | "dark" | "light";

const SLOT_COUNT = 10;

const getInitialColorScheme = (): ColorScheme => {
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
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    getInitialColorScheme,
  );
  const [prefersDark, setPrefersDark] = useState(getInitialPrefersDark);

  const applyColorScheme = (next: ColorScheme) => {
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    applyColorScheme(colorScheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDark(mediaQuery.matches);

    const onChange = () => {
      setPrefersDark(mediaQuery.matches);
      if ((localStorage.getItem("theme") || "auto") === "auto") {
        applyColorScheme("auto");
      }
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const otherColorScheme: ColorScheme = prefersDark ? "light" : "dark";
  const cycle: ColorScheme[] = ["auto", otherColorScheme];
  const activeColorScheme: ColorScheme = cycle.includes(colorScheme)
    ? colorScheme
    : "auto";

  useEffect(() => {
    if (colorScheme !== activeColorScheme) {
      setColorScheme(activeColorScheme);
      localStorage.setItem("theme", activeColorScheme);
      applyColorScheme(activeColorScheme);
    }
  }, [colorScheme, activeColorScheme]);

  const onClick = () => {
    const index = cycle.indexOf(activeColorScheme);
    const next = cycle[(index + 1) % cycle.length];
    setColorScheme(next);
    localStorage.setItem("theme", next);
    applyColorScheme(next);
  };

  const getIconName = (slotColorScheme: ColorScheme): SvgName => {
    if (slotColorScheme === "auto") {
      return prefersDark ? "moonAuto" : "sunAuto";
    }
    return slotColorScheme === "dark" ? "moon" : "sun";
  };

  return (
    <DialButton
      slotCount={SLOT_COUNT}
      activeSlot={activeColorScheme === "auto" ? 0 : 1}
      onStep={onClick}
      ariaLabel={`ColorScheme: ${activeColorScheme}`}
    >
      {({ slotIndex, slotAngle, dialRotate, hovered }) => {
        let slotColorScheme: ColorScheme | undefined;

        if (slotIndex === 0) slotColorScheme = "auto";
        if (slotIndex === 1) slotColorScheme = otherColorScheme;

        if (!slotColorScheme) return null;

        const isActive = slotColorScheme === activeColorScheme;
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
            transition={pew()}
          >
            <path
              d={SVGS[getIconName(slotColorScheme)]}
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>
        );
      }}
    </DialButton>
  );
};

export default ThemeSwitch;
