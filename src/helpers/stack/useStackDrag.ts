import type { PanInfo } from "framer-motion";

const SWIPE_OFFSET_THRESHOLD = 80;
const SWIPE_VELOCITY_THRESHOLD = 500;

type UseStackDragInput = {
  length: number;
  onSwipe: (velocity: number) => void;
  offsetThreshold?: number;
  velocityThreshold?: number;
};

export const useStackDrag = ({
  length,
  onSwipe,
  offsetThreshold = SWIPE_OFFSET_THRESHOLD,
  velocityThreshold = SWIPE_VELOCITY_THRESHOLD,
}: UseStackDragInput) => {
  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (length <= 1) {
      return;
    }

    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    const hasOffsetSwipe = Math.abs(offsetX) >= offsetThreshold;
    const hasVelocitySwipe = Math.abs(velocityX) >= velocityThreshold;

    if (!hasOffsetSwipe && !hasVelocitySwipe) {
      return;
    }

    const velocity = hasVelocitySwipe
      ? velocityX
      : offsetX !== 0
        ? offsetX
        : velocityX;

    onSwipe(velocity);
  };

  return {
    onDragEnd,
  };
};
