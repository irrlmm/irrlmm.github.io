import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import type { GenericCardContent } from ".";
import styles from "./styles.module.css";

type Props<T> = {
  index: number;
  card: T;
  isActive: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  shouldSwipe: boolean;
  renderItem: React.FC<GenericCardContent<T>>;
};

const AnimatedCard = <T,>({
  index,
  card,
  isActive,
  onSwipeLeft,
  onSwipeRight,
  shouldSwipe,
  renderItem: CardContent,
}: Props<T>) => {
  const deviateX = 100;
  const baseX = Math.random() * deviateX - deviateX / 2;
  const baseY = Math.abs(baseX) / 4;
  const [isConstrained, setIsConstrained] = useState(true);

  const v = useRef(0);

  const controls = useAnimation();
  const x = useMotionValue(baseX);
  const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5], {
    clamp: false,
  });

  const variants = {
    idle: {
      x: baseX,
      y: baseY,
      scale: 0.98,
      filter: `blur(${2.5 * index}px)`,
      boxShadow: "0 0 0 1px rgba(128, 128, 128, 0.1)",
    },
    active: {
      x: 0,
      y: 0,
      filter: "blur(0.0px)",
      boxShadow: "0 0 0 1px var(--on-surface)",
    },
    swipeR: {
      x: 500,
    },
    swipeL: {
      x: -500,
    },
  };

  useEffect(() => {
    if (isActive) {
      controls.start(isActive ? "active" : "idle");
    } else {
      controls.start("idle");
    }
  }, [isActive, index]);

  useEffect(() => {
    if (shouldSwipe) {
      const dir = Math.random() - 0.5;
      swipeAway(dir > 0 ? "swipeR" : "swipeL");
    }
  }, [shouldSwipe]);

  const handleDrag = () => {
    v.current = x.getVelocity();
  };

  const swipeAway = (variant: "swipeL" | "swipeR") => {
    setIsConstrained(false);
    controls.start(variant, { duration: 0.2 }).finally(() => {
      setIsConstrained(true);
      switch (variant) {
        case "swipeL":
          onSwipeLeft();
          break;
        case "swipeR":
          onSwipeRight();
          break;
        default:
          break;
      }
    });
  };

  const handleDragEnd = () => {
    if (Math.abs(v.current) > 200 || Math.abs(x.get()) > 200) {
      swipeAway(
        Math.abs(v.current) > 200
          ? v.current > 0
            ? "swipeR"
            : "swipeL"
          : x.get() > 0
          ? "swipeR"
          : "swipeL"
      );
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${isActive && styles.cardActive}`}
      animate={controls}
      variants={variants}
      drag={isActive}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      dragConstraints={
        isConstrained && { left: 0, right: 0, top: 0, bottom: 0 }
      }
      dragElastic={{ top: 0.2, bottom: 0.2, left: 1, right: 1 }}
      style={{
        x,
        rotate,
      }}
      transition={{
        type: "spring",
        delay: 0.01,
        bounce: 0.1,
        duration: 0.5,
      }}
    >
      <CardContent isActive={isActive} card={card} />
    </motion.div>
  );
};

export default AnimatedCard;
