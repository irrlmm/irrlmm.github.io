export type GenericCardContent<T> = {
  index?: number;
  card: T;
  isDraggable?: boolean;
  onClick?: (payload: any) => void;
  trackMeta?: object;
};

import React from "react";
import { motion, type MotionValue, useMotionValue } from "framer-motion";

import useSwipeCard from "../../helpers/useSwipeCard";

import styles from "./styles.module.css";

type Props<T> = {
  card: T;
  index: number;
  renderItem: React.FC<GenericCardContent<T>>;
  isRemovable?: boolean;
  isDraggable?: boolean;
  shouldSwipe: boolean;
  onSwipe: () => void;
  onClick?: (payload: any) => void;
  trackMeta?: object;
  pointerNormX?: MotionValue<number>;
  pointerNormY?: MotionValue<number>;
};

const AnimatedCard = <T,>({
  index,
  card,
  onSwipe,
  renderItem: CardContent,
  isDraggable = true,
  isRemovable = false,
  shouldSwipe,
  onClick,
  trackMeta,
  pointerNormX,
  pointerNormY,
}: Props<T>) => {
  const defaultPointerX = useMotionValue(0);
  const defaultPointerY = useMotionValue(0);

  const { variants, style, isConstrained, handleDrag, handleDragEnd } =
    useSwipeCard({
      index,
      shouldSwipe,
      onSwipe,
      isRemovable,
      pointerNormX: pointerNormX ?? defaultPointerX,
      pointerNormY: pointerNormY ?? defaultPointerY,
    });

  return (
    <motion.div
      className={`${styles.card} ${
        isDraggable && index === 0 && styles.draggable
      }`}
      variants={variants}
      drag={isDraggable && index === 0 ? "x" : false}
      onDrag={isDraggable ? handleDrag : undefined}
      onDragEnd={isDraggable ? handleDragEnd : undefined}
      dragConstraints={
        isConstrained && { left: 0, right: 0, top: 0, bottom: 0 }
      }
      dragElastic={{ top: 0.1, bottom: 0.1, left: 1, right: 1 }}
      style={style}
    >
      <CardContent
        card={card}
        index={index}
        onClick={onClick}
        trackMeta={trackMeta}
      />
    </motion.div>
  );
};

export default AnimatedCard;
