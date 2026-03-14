import { useSpring, useTransform, type MotionValue } from "framer-motion";
import { SPRING_CONFIG } from "../motion";

const TRANSLATE_MAX = 1.5;
const ROTATE_MAX = 2;
const ROTATE_Y_MAX = 4;

type useStackHoverInput = {
  index: number;
  moveX: MotionValue<number>;
  moveY: MotionValue<number>;
};

export const useStackHover = ({ index, moveX, moveY }: useStackHoverInput) => {
  const translateX = useTransform(
    moveX,
    [-1, 1],
    [`${TRANSLATE_MAX * (index + 1)}%`, `${-1 * TRANSLATE_MAX * (index + 1)}%`],
  );

  const translateY = useTransform(
    moveY,
    [-1, 1],
    [
      `${TRANSLATE_MAX * (index + 1)}%`,
      `${-1 * (TRANSLATE_MAX * (index + 1))}%`,
    ],
  );

  const baseRotate = -1 * ROTATE_MAX * index;
  const rotate = useTransform(moveX, (x) => baseRotate * (1 + x));
  const rotateSpring = useSpring(rotate, SPRING_CONFIG);
  const rotateY = useTransform(
    moveY,
    [-1, 1],
    [-1 * ROTATE_Y_MAX, ROTATE_Y_MAX],
  );
  const rotateYSpring = useSpring(rotateY, SPRING_CONFIG);

  return {
    translateX,
    translateY,
    rotateSpring,
    rotateYSpring,
  };
};
