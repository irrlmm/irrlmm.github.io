import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const useSwipeCard = ({
  index,
  shouldSwipe,
  onSwipe,
  isRemovable,
}: {
  index: number;
  onSwipe: () => void;
  shouldSwipe?: boolean;
  isRemovable?: boolean;
}) => {
  const baseX = (index <= 4 ? index : 4) * -1 * 24;
  const baseY = Math.abs(baseX) / 2;

  const [isConstrained, setIsConstrained] = useState(true);

  const v = useRef(0);
  const x = useMotionValue(baseX);

  const rotate = useTransform(x, [-100, 100], [-5, 5], {
    clamp: false,
  });

  const variants = {
    hidden: {
      x: baseX + 64,
      y: 0,
      filter: `blur(${index > 4 ? 8 : 2 * index}px)`,
      scale: index > 4 ? 0.9 : 1 - index * 0.025,
      boxShadow: `0 0 0 2px var(--on-surface)`,
      opacity: 0,
    },
    shown: {
      x: baseX,
      y: baseY,
      filter: `blur(${index > 4 ? 8 : 2 * index}px)`,
      scale: index > 4 ? 0.9 : 1 - index * 0.025,
      boxShadow: `0 0 0 2px ${index > 4 ? "transparent" : "var(--on-surface)"}`,
      opacity: isRemovable && shouldSwipe ? 0 : 1,
      transition: {
        type: "spring",
        bounce: 0.15,
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    if (shouldSwipe) {
      const dir = Math.random() - 0.5;
      swipeAway(dir > 0 ? 1 : -1);
    }
  }, [shouldSwipe]);

  const handleDrag = () => {
    v.current = x.getVelocity();
  };

  const swipeAway = (direction: -1 | 1) => {
    setIsConstrained(false);
    animate(x, direction * 800, { duration: 0.2 }).then(() => {
      setIsConstrained(true);
      onSwipe();
    });
  };

  const handleDragEnd = () => {
    // if (Math.abs(v.current) > 750) {
    //   swipeAway(v.current > 0 ? 1 : -1);
    // } else
    if (Math.abs(x.get()) > 128) {
      swipeAway(x.get() > 0 ? 1 : -1);
    }
  };

  return {
    variants,
    style: { x, rotate },
    isConstrained,
    handleDrag,
    handleDragEnd,
  };
};

export default useSwipeCard;
