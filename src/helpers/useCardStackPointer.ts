import { animate, useMotionValue, type MotionValue } from "framer-motion";
import type { PointerEvent } from "react";

type UseCardStackPointerResult = {
  pointerNormX: MotionValue<number>;
  pointerNormY: MotionValue<number>;
  handlePointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerLeave: () => void;
};

const useCardStackPointer = (): UseCardStackPointerResult => {
  const pointerNormX = useMotionValue(0);
  const pointerNormY = useMotionValue(0);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width || 1;
    const height = rect.height || 1;
    const normalizedX = ((event.clientX - rect.left) / width - 0.5) * 2;
    const normalizedY = ((event.clientY - rect.top) / height - 0.5) * 2;
    pointerNormX.set(normalizedX);
    pointerNormY.set(normalizedY);
  };

  const handlePointerLeave = () => {
    animate(pointerNormX, 0, { type: "spring", stiffness: 260, damping: 24 });
    animate(pointerNormY, 0, { type: "spring", stiffness: 260, damping: 24 });
  };

  return {
    pointerNormX,
    pointerNormY,
    handlePointerMove,
    handlePointerLeave,
  };
};

export default useCardStackPointer;
