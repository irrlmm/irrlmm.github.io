import { useTransform, type MotionValue } from "framer-motion";

const DEFAULT_TILT = 10;

type UseTiltInput = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  maxTilt?: number;
};

export const useTilt = ({ x, y, maxTilt }: UseTiltInput) => {
  const resolvedMaxTilt = maxTilt ?? DEFAULT_TILT;

  const tiltX = useTransform(y, [-1, 1], [resolvedMaxTilt, -resolvedMaxTilt]);
  const tiltY = useTransform(x, [-1, 1], [-resolvedMaxTilt, resolvedMaxTilt]);

  return {
    tiltX,
    tiltY,
  };
};
