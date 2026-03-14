import type { MotionValue, PanInfo } from "framer-motion";

export type CardBase = { id: string };

export type StackMotionProps = {
  index: number;
  moveX: MotionValue<number>;
  moveY: MotionValue<number>;
  isSwipingOut: boolean;
  swipeVelocity: number;
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onSwipeOutComplete: () => void;
};

export type StackDataProps<T extends CardBase> = T;

export type StackCardProps<T extends CardBase> = StackMotionProps &
  StackDataProps<T>;
