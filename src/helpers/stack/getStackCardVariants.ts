const CARD_GAP = 8;
const MAX_LAYERS = 4;
const BLUR_STEP = 0.5;

export const getStackCardVariants = (index: number) => {
  const visualIndex = Math.min(index, MAX_LAYERS - 1);

  const offsetX = -1 * visualIndex * CARD_GAP;
  const offsetY = -1 * offsetX;
  const blur = visualIndex * BLUR_STEP;

  const shownOpacity = MAX_LAYERS - index > 0 ? 1 : 0;

  const variants = {
    hidden: {
      x: 0,
      y: 0,
      scale: 0.95,
      filter: `blur(0.5rem)`,
      opacity: 0,
    },
    shown: {
      x: offsetX,
      y: offsetY,
      scale: 1,
      filter: `blur(${blur}px)`,
      opacity: shownOpacity,
    },
    exit: {
      scale: 1.05,
      filter: `blur(0.5rem)`,
      opacity: 0,
    },
  };

  return {
    variants,
  };
};
