import {
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";

const DEFAULT_BACKGROUND_SCALE = 1.1;

type UseParallaxInput = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export const useParallax = ({ x, y }: UseParallaxInput) => {
  const positionTravel =
    (DEFAULT_BACKGROUND_SCALE - 1 / DEFAULT_BACKGROUND_SCALE) * 2 * 100;

  const backgroundPositionX = useTransform(
    x,
    [-1, 1],
    [50 - positionTravel, 50 + positionTravel],
  );
  const backgroundPositionY = useTransform(
    y,
    [-1, 1],
    [50 - positionTravel, 50 + positionTravel],
  );

  return {
    backgroundPosition: useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`,
    backgroundSize: `${DEFAULT_BACKGROUND_SCALE * 100}%`,
  };
};
