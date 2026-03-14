import { motion } from "framer-motion";
import { getStackCardVariants } from "../../helpers/stack/getStackCardVariants";
import { useStackHover } from "../../helpers/stack/useStackHover";

import type { StackCardProps } from "./types";

import styles from "./styles.module.css";

const StackCard: React.FC<
  StackCardProps<{ id: string; text?: string; icon?: string }>
> = ({
  index,
  text,
  moveX,
  moveY,
  isSwipingOut,
  swipeVelocity,
  onDragEnd,
  onSwipeOutComplete,
}) => {
  const isDraggable = index === 0 && !isSwipingOut;

  const { variants } = getStackCardVariants(index);

  const { translateX, translateY, rotateSpring, rotateYSpring } = useStackHover(
    {
      index,
      moveX,
      moveY,
    },
  );

  const getClampedSwipeVelocity = (velocity: number) => {
    const direction = velocity < 0 ? -1 : 1;
    const magnitude = Math.min(3000, Math.max(400, Math.abs(velocity)));
    return direction * magnitude;
  };

  const getSwipeOutTransition = (velocity: number) => {
    const clampedVelocity = getClampedSwipeVelocity(velocity);

    return {
      x: {
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.9,
        velocity: clampedVelocity,
      },
      opacity: {
        duration: 0.12,
        ease: "linear",
      },
    } as const;
  };
  const swipeOutTransition = getSwipeOutTransition(swipeVelocity);
  const swipeOutTargetX = swipeVelocity < 0 ? -640 : 640;

  return (
    <motion.div
      className={`ui-card col align-center justify-center ${isDraggable ? styles.draggable : ""}`}
      variants={variants}
      drag={isDraggable ? "x" : false}
      dragSnapToOrigin
      dragMomentum={false}
      onDragEnd={onDragEnd}
      animate={
        isSwipingOut
          ? {
              x: swipeOutTargetX,
              transition: swipeOutTransition,
            }
          : "shown"
      }
      onAnimationComplete={() => {
        if (isSwipingOut) {
          onSwipeOutComplete();
        }
      }}
      style={{
        translateX: translateX,
        translateY: translateY,
        rotate: rotateSpring,
        rotateY: rotateYSpring,
        zIndex: isDraggable ? 2 : 1,
      }}
    >
      <q className={styles.quote}>{text}</q>

      {[0, 0, 0, 0].map((_, i) => (
        <div key={i} className={styles.overlayDot} />
      ))}
    </motion.div>
  );
};

export default StackCard;
