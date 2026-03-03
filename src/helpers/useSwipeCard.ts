import {
  animate,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CARD_GAP = 16;
const MAX_OFFSET_LAYERS = 10;
const VERTICAL_OFFSET_FACTOR = 1;
const BLUR_STEP = 0.5;
const POINTER_OFFSET_X = 16;
const POINTER_OFFSET_Y = 16;

const useSwipeCard = ({
  index,
  shouldSwipe,
  onSwipe,
  isRemovable,
  pointerNormX,
  pointerNormY,
}: {
  index: number;
  onSwipe: () => void;
  shouldSwipe?: boolean;
  isRemovable?: boolean;
  pointerNormX: MotionValue<number>;
  pointerNormY: MotionValue<number>;
}) => {
  const offsetLayer = Math.min(index, MAX_OFFSET_LAYERS);
  const baseX = offsetLayer * -1 * CARD_GAP;
  const baseY = Math.abs(baseX) * VERTICAL_OFFSET_FACTOR;
  const blur = index * BLUR_STEP;

  const [isConstrained, setIsConstrained] = useState(true);

  const v = useRef(0);
  const x = useMotionValue(baseX);
  const offsetRatio = MAX_OFFSET_LAYERS ? offsetLayer / MAX_OFFSET_LAYERS : 0;
  const pointerDepthFactor = index * offsetRatio;
  const xWithPointer = useTransform([x, pointerNormX], ([dragX, pointer]) => {
    return dragX + pointer * POINTER_OFFSET_X * pointerDepthFactor;
  });
  const yWithPointer = useTransform(pointerNormY, (pointer) => {
    return baseY + pointer * POINTER_OFFSET_Y * pointerDepthFactor;
  });

  const rotate = useTransform(x, [-100, 100], [-5, 5], {
    clamp: false,
  });

  const variants = {
    hidden: {
      x: 8,
      y: 0,
      filter: `blur(${blur}px)`,
      scale: index > 4 ? 0.9 : 1 - index * 0.025,
      opacity: 0,
    },
    shown: {
      x: baseX,
      y: baseY,
      filter: `blur(${blur}px)`,
      scale: index > 4 ? 0.9 : 1 - index * 0.025,
      opacity: isRemovable && shouldSwipe ? 0 : 1,
      transition: {
        type: "spring",
        bounce: 0.1,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  useEffect(() => {
    if (shouldSwipe) {
      const dir = Math.random() - 0.5;
      swipeAway(dir > 0 ? 1 : -1);
    }
  }, [shouldSwipe]);

  useEffect(() => {
    x.set(baseX);
  }, [baseX]);

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
    if (Math.abs(v.current) > 1500) {
      swipeAway(v.current > 0 ? 1 : -1);
    } else if (Math.abs(x.get()) > 128) {
      swipeAway(x.get() > 0 ? 1 : -1);
    }
  };

  return {
    variants,
    style: { x: xWithPointer, y: yWithPointer, rotate },
    isConstrained,
    handleDrag,
    handleDragEnd,
  };
};

export default useSwipeCard;
