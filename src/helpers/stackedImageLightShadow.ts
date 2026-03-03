import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
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

export type LightningEffectInput = {
  tilt?: number;
  lightPoint?: [number, number];
  mixShadowColor?: string;
  lightEffectIntensity?: number;
  defaultPerspective?: number;
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
const SHADOW_TRAVEL = 16;

type UseHighlightLayerInput = {
  lightX: number;
  lightY: number;
  maxTilt: number;
  animatedTiltX: MotionValue<number>;
  animatedTiltY: MotionValue<number>;
  highlightIntensity: MotionValue<number>;
};

const useHighlightLayerTransforms = ({
  lightX,
  lightY,
  maxTilt,
  animatedTiltX,
  animatedTiltY,
  highlightIntensity,
}: UseHighlightLayerInput) => {
  const lightBaseX = lightX * 100;
  const lightBaseY = lightY * 100;

  const highlightCenterX = useTransform(
    animatedTiltY,
    [-maxTilt, maxTilt],
    [
      `${lightBaseX + LIGHT_POSITION_TRAVEL}%`,
      `${lightBaseX - LIGHT_POSITION_TRAVEL}%`,
    ],
  );

  const highlightCenterY = useTransform(
    animatedTiltX,
    [-maxTilt, maxTilt],
    [
      `${lightBaseY - LIGHT_POSITION_TRAVEL}%`,
      `${lightBaseY + LIGHT_POSITION_TRAVEL}%`,
    ],
  );

  const highlightOpacity = useSpring(highlightIntensity, SPRING_CONFIG);
  const highlightGradient = useMotionTemplate`radial-gradient(
    circle at ${highlightCenterX} ${highlightCenterY},
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  )`;

  return {
    highlightOpacity,
    highlightGradient,
  };
};

type UseShadowLayerInput = {
  lightX: number;
  lightY: number;
  maxTilt: number;
  animatedTiltX: MotionValue<number>;
  animatedTiltY: MotionValue<number>;
  shadowIntensity: MotionValue<number>;
};

const useShadowLayerTransforms = ({
  lightX,
  lightY,
  maxTilt,
  animatedTiltX,
  animatedTiltY,
  shadowIntensity,
}: UseShadowLayerInput) => {
  const shadowBaseX = lightX * 100;
  const shadowBaseY = lightY * 100;

  const shadowOpacity = useSpring(shadowIntensity, SPRING_CONFIG);
  const shadowCenterX = useTransform(
    animatedTiltY,
    [-maxTilt, maxTilt],
    [
      `${shadowBaseX + SHADOW_POSITION_TRAVEL}%`,
      `${shadowBaseX - SHADOW_POSITION_TRAVEL}%`,
    ],
  );
  const shadowCenterY = useTransform(
    animatedTiltX,
    [-maxTilt, maxTilt],
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

  return {
    shadowOpacity,
    shadowGradient,
  };
};

type UseBoxShadowLayerInput = {
  lightX: number;
  lightY: number;
  maxTilt: number;
  animatedTiltX: MotionValue<number>;
  animatedTiltY: MotionValue<number>;
  highlightOpacity: MotionValue<number>;
  lightEffectIntensity: number;
  mixShadowColor?: string;
};

const useBoxShadowLayerTransforms = ({
  lightX,
  lightY,
  maxTilt,
  animatedTiltX,
  animatedTiltY,
  highlightOpacity,
  lightEffectIntensity,
  mixShadowColor,
}: UseBoxShadowLayerInput) => {
  const resolvedShadowMixColor = mixShadowColor?.trim() || "rgba(0, 0, 0, 0)";

  const shadowBaseOffsetX = (0.5 - lightX) * SHADOW_TRAVEL;
  const shadowBaseOffsetY = (0.5 - lightY) * SHADOW_TRAVEL;
  const shadowOffsetX = useTransform(
    animatedTiltY,
    [-maxTilt, maxTilt],
    [shadowBaseOffsetX + SHADOW_TRAVEL, shadowBaseOffsetX - SHADOW_TRAVEL],
  );
  const shadowOffsetY = useTransform(
    animatedTiltX,
    [-maxTilt, maxTilt],
    [shadowBaseOffsetY - SHADOW_TRAVEL, shadowBaseOffsetY + SHADOW_TRAVEL],
  );
  const shadowBlur = useTransform(
    highlightOpacity,
    [0, 1],
    [8 + lightEffectIntensity * 24, 8 + lightEffectIntensity * 8],
  );
  const shadowAlpha = useTransform(
    highlightOpacity,
    [0, 1],
    [0.1 + lightEffectIntensity * 0.2, 0.2 + lightEffectIntensity * 1],
  );

  const boxShadow = useMotionTemplate`
    inset 0 0 0 var(--line) var(--outline),
    ${shadowBaseOffsetX}px ${shadowBaseOffsetY}px ${8 + lightEffectIntensity * 24}px -8px color-mix(in srgb, ${resolvedShadowMixColor} ${10 + 90 * lightEffectIntensity}%, transparent),
    ${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px -2px rgba(0, 0, 0, ${shadowAlpha})
  `;

  return {
    boxShadow,
  };
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
  mixShadowColor,
  lightEffectIntensity = DEFAULT_LIGHT_EFFECT_INTENSITY,
  defaultPerspective = DEFAULT_PERSPECTIVE,
}: LightningEffectInput) => {
  const maxTilt = tilt ?? DEFAULT_TILT;
  const resolvedLightPoint = lightPoint ?? DEFAULT_LIGHT_POINT;

  const [lightX, lightY] = resolvedLightPoint;

  const wrapperRef = useRef<T>(null);

  const [elementPerspective, setElementPerspective] =
    useState(defaultPerspective);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
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

  const animatedTiltX = useSpring(tiltX, SPRING_CONFIG);
  const animatedTiltY = useSpring(tiltY, SPRING_CONFIG);

  const { highlightOpacity, highlightGradient } = useHighlightLayerTransforms({
    lightX,
    lightY,
    maxTilt,
    animatedTiltX,
    animatedTiltY,
    highlightIntensity,
  });
  const { shadowOpacity, shadowGradient } = useShadowLayerTransforms({
    lightX,
    lightY,
    maxTilt,
    animatedTiltX,
    animatedTiltY,
    shadowIntensity,
  });
  const { boxShadow } = useBoxShadowLayerTransforms({
    lightX,
    lightY,
    maxTilt,
    animatedTiltX,
    animatedTiltY,
    highlightOpacity,
    lightEffectIntensity,
    mixShadowColor,
  });

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
      tilt: maxTilt,
      lightPoint: resolvedLightPoint,
      lightEffectIntensity,
    });

    tiltY.set(nextRotateY);
    tiltX.set(nextRotateX);
    highlightIntensity.set(nextHighlightIntensity);
    shadowIntensity.set(nextShadowIntensity);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
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
      rotateX: animatedTiltX,
      rotateY: animatedTiltY,
      boxShadow,
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
