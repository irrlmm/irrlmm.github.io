import {
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";

const HIGHLIGHT_FALLOFF_CURVE = 1;
const SHADOW_FALLOFF_CURVE = 1;
const LIGHT_POSITION_TRAVEL = 100;
const SHADOW_POSITION_TRAVEL = 100;
const DEFAULT_LIGHT_POINT: [number, number] = [0.33, 0.33];
const DEFAULT_LIGHT_EFFECT_INTENSITY = 1;
const CENTERED_MIN = -1;
const CENTERED_MAX = 1;

const clampToCentered = (value: number) =>
  Math.min(CENTERED_MAX, Math.max(CENTERED_MIN, value));

const centeredToNormalized = (value: number) =>
  (clampToCentered(value) + 1) / 2;

type UseHighlightInput = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  lightPoint?: [number, number];
  intensity?: number;
};

export const useHighlight = ({
  x,
  y,
  lightPoint = DEFAULT_LIGHT_POINT,
  intensity = DEFAULT_LIGHT_EFFECT_INTENSITY,
}: UseHighlightInput) => {
  const [lightX, lightY] = lightPoint;

  const lightBaseX = lightX * 100;
  const lightBaseY = lightY * 100;

  const highlightIntensity = useTransform(
    [x, y],
    ([nextX, nextY]: number[]) => {
      const normalizedX = centeredToNormalized(nextX);
      const normalizedY = centeredToNormalized(nextY);
      const dx = normalizedX - lightX;
      const dy = normalizedY - lightY;
      const distance = Math.min(1, Math.hypot(dx, dy));
      const focus = 1 - distance;

      return focus ** HIGHLIGHT_FALLOFF_CURVE * intensity;
    },
  );

  const dimIntensity = useTransform(highlightIntensity, [0, 1], [0.33, 0]);

  const highlightCenterX = useTransform(
    x,
    [-1, 1],
    [
      `${lightBaseX + LIGHT_POSITION_TRAVEL}%`,
      `${lightBaseX - LIGHT_POSITION_TRAVEL}%`,
    ],
  );

  const highlightCenterY = useTransform(
    y,
    [-1, 1],
    [
      `${lightBaseY + LIGHT_POSITION_TRAVEL}%`,
      `${lightBaseY - LIGHT_POSITION_TRAVEL}%`,
    ],
  );

  const shadowCenterX = useTransform(
    x,
    [-1, 1],
    [
      `${lightBaseX + SHADOW_POSITION_TRAVEL}%`,
      `${lightBaseX - SHADOW_POSITION_TRAVEL}%`,
    ],
  );

  const shadowCenterY = useTransform(
    y,
    [-1, 1],
    [
      `${lightBaseY + SHADOW_POSITION_TRAVEL}%`,
      `${lightBaseY - SHADOW_POSITION_TRAVEL}%`,
    ],
  );

  const highlightGradient = useMotionTemplate`radial-gradient(
    circle at ${highlightCenterX} ${highlightCenterY},
    rgba(255, 255, 255, ${highlightIntensity}) 0%,
    rgba(255, 255, 255, 0) 100%
  )`;

  const dimGradient = useMotionTemplate`radial-gradient(
    ellipse at ${shadowCenterX} ${shadowCenterY},
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, ${dimIntensity}) 100%
  )`;

  return {
    highlightIntensity,
    dimIntensity,
    highlightStyle: {
      background: highlightGradient,
      opacity: highlightIntensity,
    },
    dimStyle: {
      background: dimGradient,
      opacity: dimIntensity,
    },
  };
};
