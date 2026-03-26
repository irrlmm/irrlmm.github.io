import { useSpring, useTransform, type MotionValue } from "framer-motion";
import { pew } from "../motion";

const TRANSLATE_MAX = 1.5;
const ROTATE_MAX = 2;

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

  const translateXSpring = useSpring(translateX, pew(0.5));
  const translateYSpring = useSpring(translateY, pew(0.5));
  const rotateSpring = useSpring(rotate, pew(0.5));

  return {
    translateX: translateXSpring,
    translateY: translateYSpring,
    rotate: rotateSpring,
  };
};
