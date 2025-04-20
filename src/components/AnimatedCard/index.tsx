export type GenericCard<T> = T & {
  id: string;
};

export type GenericCardContent<T> = {
  card: T;
  index?: number;
  isDraggable?: boolean;
  onClick?: (payload: any) => void;
  trackMeta?: any;
};

import React from "react";
import { motion } from "framer-motion";

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
  trackMeta?: any;
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
}: Props<T>) => {
  const { variants, style, isConstrained, handleDrag, handleDragEnd } =
    useSwipeCard({ index, shouldSwipe, onSwipe, isRemovable });

  return (
    <motion.div
      className={`${styles.card} ${
        isDraggable && index === 0 && styles.draggable
      }`}
      variants={variants}
      drag={isDraggable && index === 0}
      onDrag={isDraggable ? handleDrag : undefined}
      onDragEnd={isDraggable ? handleDragEnd : undefined}
      dragConstraints={
        isConstrained && { left: 0, right: 0, top: 0, bottom: 0 }
      }
      dragElastic={{ top: 0.25, bottom: 0.25, left: 1, right: 1 }}
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
