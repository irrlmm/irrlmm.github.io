import {
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";

const SHADOW_TRAVEL = 4;

type UseShadowInput = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  highlightIntensity: MotionValue<number>;
  gloomColor: string;
  shadowColor: string;
};

export const useGloom = ({
  x,
  y,
  highlightIntensity,
  gloomColor,
  shadowColor,
}: UseShadowInput) => {
  const gloomOffsetX = useTransform(
    x,
    [-1, 1],
    [SHADOW_TRAVEL, -SHADOW_TRAVEL],
  );

  const gloomOffsetY = useTransform(
    y,
    [-1, 1],
    [SHADOW_TRAVEL, -SHADOW_TRAVEL],
  );

  const shadowOffsetX = useTransform(
    x,
    [-1, 1],
    [SHADOW_TRAVEL, -SHADOW_TRAVEL],
  );

  const shadowOffsetY = useTransform(
    y,
    [-1, 1],
    [SHADOW_TRAVEL, -SHADOW_TRAVEL],
  );

  const gloomOpacity = useTransform(highlightIntensity, [0, 1], [12, 100]);

  const shadowOpacity = useTransform(highlightIntensity, [0, 1], [100, 20]);

  return {
    boxShadow: useMotionTemplate`
      ${shadowOffsetX}px ${shadowOffsetY}px 16px -6px color-mix(${shadowColor} ${shadowOpacity}%, transparent),
      ${gloomOffsetX}px ${gloomOffsetY}px 40px -4px color-mix(${gloomColor} ${gloomOpacity}%, transparent)
    `,
  };
};
