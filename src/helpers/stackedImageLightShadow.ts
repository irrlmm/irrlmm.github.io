import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { SPRING_CONFIG } from "./motion";

type LightShadowCalculationInput = {
  normalizedX: number;
  normalizedY: number;
  tilt: number;
  lightPoint: [number, number];
  lightEffectIntensity: number;
};

type LightShadowCalculationResult = {
  rotateX: number;
  rotateY: number;
  highlightIntensity: number;
  shadowIntensity: number;
};

type UseStackedImageLightShadowTransformsInput = {
  tilt?: number;
  lightPoint?: [number, number];
  mixShadowColor?: string;
  lightEffectIntensity?: number;
  defaultPerspective?: number;
  dynamicContainerShadow?: boolean;
};

const HIGHLIGHT_FALLOFF_CURVE = 5;
const SHADOW_FALLOFF_CURVE = 2;
const LIGHT_POSITION_TRAVEL = 100;
const SHADOW_POSITION_TRAVEL = 100;
const DEFAULT_TILT = 10;
const DEFAULT_LIGHT_POINT: [number, number] = [0.33, 0.125];
const DEFAULT_LIGHT_EFFECT_INTENSITY = 0.33;
const DEFAULT_PERSPECTIVE = 1600;
const PERSPECTIVE_MULTIPLIER = 2;

const parseColorToRgb = (color?: string) => {
  if (!color) return { r: 0, g: 0, b: 0 };

  const trimmed = color.trim().toLowerCase();
  const rgbMatch = trimmed.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/,
  );
  if (rgbMatch) {
    return {
      r: Math.min(255, Number(rgbMatch[1])),
      g: Math.min(255, Number(rgbMatch[2])),
      b: Math.min(255, Number(rgbMatch[3])),
    };
  }

  const hex = trimmed.replace("#", "");
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  }

  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  return { r: 0, g: 0, b: 0 };
};

export const calculateStackedImageLightShadow = ({
  normalizedX,
  normalizedY,
  tilt,
  lightPoint,
  lightEffectIntensity,
}: LightShadowCalculationInput): LightShadowCalculationResult => {
  const [lightX, lightY] = lightPoint;
  const centeredX = normalizedX * 2 - 1;
  const centeredY = normalizedY * 2 - 1;
  const dx = normalizedX - lightX;
  const dy = normalizedY - lightY;

  // Focus is strongest near the light point and falls off with distance.
  const distance = Math.min(1, Math.hypot(dx, dy));
  const focus = 1 - distance;

  return {
    rotateY: centeredX * tilt,
    rotateX: -centeredY * tilt,
    highlightIntensity: focus ** HIGHLIGHT_FALLOFF_CURVE * lightEffectIntensity,
    shadowIntensity: (1 - focus) ** SHADOW_FALLOFF_CURVE * lightEffectIntensity,
  };
};

export const useStackedImageLightShadowTransforms = <
  T extends HTMLElement = HTMLDivElement,
>({
  tilt,
  lightPoint,
  mixShadowColor = "rgba(0, 0, 0, 0.1)",
  lightEffectIntensity = DEFAULT_LIGHT_EFFECT_INTENSITY,
  defaultPerspective = DEFAULT_PERSPECTIVE,
}: UseStackedImageLightShadowTransformsInput) => {
  const resolvedTilt = tilt ?? DEFAULT_TILT;
  const resolvedLightPoint = lightPoint ?? DEFAULT_LIGHT_POINT;

  const [lightX, lightY] = resolvedLightPoint;

  const wrapperRef = useRef<T>(null);

  const [elementPerspective, setElementPerspective] =
    useState(defaultPerspective);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const highlightIntensity = useMotionValue(0);
  const shadowIntensity = useMotionValue(0);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const updatePerspective = () => {
      const rect = element.getBoundingClientRect();
      const nextPerspective = Math.max(rect.width, rect.height);
      setElementPerspective(
        nextPerspective > 0 ? nextPerspective : defaultPerspective,
      );
    };

    updatePerspective();

    const observer = new ResizeObserver(updatePerspective);
    observer.observe(element);

    return () => observer.disconnect();
  }, [defaultPerspective]);

  // Gradient centers are in CSS % space (0-100), so lightPoint maps directly.
  const lightBaseX = lightX * 100;
  const lightBaseY = lightY * 100;
  const shadowBaseX = lightX * 100;
  const shadowBaseY = lightY * 100;

  const tiltX = useSpring(rotateX, SPRING_CONFIG);
  const tiltY = useSpring(rotateY, SPRING_CONFIG);

  const highlightCenterX = useTransform(
    tiltY,
    [-resolvedTilt, resolvedTilt],
    [
      `${lightBaseX + LIGHT_POSITION_TRAVEL}%`,
      `${lightBaseX - LIGHT_POSITION_TRAVEL}%`,
    ],
  );

  const highlightCenterY = useTransform(
    tiltX,
    [-resolvedTilt, resolvedTilt],
    [
      `${lightBaseY - LIGHT_POSITION_TRAVEL}%`,
      `${lightBaseY + LIGHT_POSITION_TRAVEL}%`,
    ],
  );

  const highlightOpacity = useSpring(highlightIntensity, SPRING_CONFIG);
  const shadowOpacity = useSpring(shadowIntensity, SPRING_CONFIG);
  const shadowMixColor = parseColorToRgb(mixShadowColor);

  const highlightGradient = useMotionTemplate`radial-gradient(
    circle at ${highlightCenterX} ${highlightCenterY},
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  )`;

  const shadowCenterX = useTransform(
    tiltY,
    [-resolvedTilt, resolvedTilt],
    [
      `${shadowBaseX + SHADOW_POSITION_TRAVEL}%`,
      `${shadowBaseX - SHADOW_POSITION_TRAVEL}%`,
    ],
  );
  const shadowCenterY = useTransform(
    tiltX,
    [-resolvedTilt, resolvedTilt],
    [
      `${shadowBaseY - SHADOW_POSITION_TRAVEL}%`,
      `${shadowBaseY + SHADOW_POSITION_TRAVEL}%`,
    ],
  );

  const shadowInnerStop = useTransform(shadowOpacity, [0, 1], ["0%", "50%"]);
  const shadowOuterStop = useTransform(shadowOpacity, [0, 1], ["100%", "100%"]);
  const shadowGradient = useMotionTemplate`radial-gradient(
    circle at ${shadowCenterX} ${shadowCenterY},
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) ${shadowInnerStop},
    rgba(0, 0, 0, 1) ${shadowOuterStop}
  )`;

  const SHADOW_TRAVEL = 16;

  const shadowBaseOffsetX = (0.5 - lightX) * SHADOW_TRAVEL;
  const shadowBaseOffsetY = (0.5 - lightY) * SHADOW_TRAVEL;
  const shadowOffsetX = useTransform(
    tiltY,
    [-resolvedTilt, resolvedTilt],
    [shadowBaseOffsetX + SHADOW_TRAVEL, shadowBaseOffsetX - SHADOW_TRAVEL],
  );
  const shadowOffsetY = useTransform(
    tiltX,
    [-resolvedTilt, resolvedTilt],
    [shadowBaseOffsetY - SHADOW_TRAVEL, shadowBaseOffsetY + SHADOW_TRAVEL],
  );
  const shadowBlur = useTransform(highlightOpacity, [0, 1], [8, 16]);
  const shadowAlpha = useTransform(highlightOpacity, [0, 1], [0.2, 1]);

  const dynamicContainerBoxShadow = useMotionTemplate`
    inset 0 0 0 var(--line) var(--outline),
    ${shadowBaseOffsetX}px ${shadowBaseOffsetY}px 16px -8px rgba(${shadowMixColor.r}, ${shadowMixColor.g}, ${shadowMixColor.b}, 0.66),
    ${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px -2px rgba(0, 0, 0, ${shadowAlpha})
  `;

  const handlePointerMove = (event: PointerEvent<T>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const {
      rotateX: nextRotateX,
      rotateY: nextRotateY,
      highlightIntensity: nextHighlightIntensity,
      shadowIntensity: nextShadowIntensity,
    } = calculateStackedImageLightShadow({
      normalizedX: x,
      normalizedY: y,
      tilt: resolvedTilt,
      lightPoint: resolvedLightPoint,
      lightEffectIntensity,
    });

    rotateY.set(nextRotateY);
    rotateX.set(nextRotateX);
    highlightIntensity.set(nextHighlightIntensity);
    shadowIntensity.set(nextShadowIntensity);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    highlightIntensity.set(0);
    shadowIntensity.set(0);
  };

  return {
    wrapperRef,
    wrapperStyle: {
      perspective: elementPerspective * PERSPECTIVE_MULTIPLIER,
    },
    elementPerspective,
    containerStyle: {
      rotateX: tiltX,
      rotateY: tiltY,
      boxShadow: dynamicContainerBoxShadow,
    },
    highlightStyle: {
      background: highlightGradient,
      opacity: highlightOpacity,
    },
    shadowStyle: {
      background: shadowGradient,
      opacity: shadowOpacity,
    },
    handlePointerMove,
    handlePointerLeave,
  };
};
