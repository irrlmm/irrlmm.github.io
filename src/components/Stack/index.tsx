import { motion } from "framer-motion";
import React, { useState } from "react";

import StackProgressToolbar from "../StackProgressToolbar";

import { useHoverElement } from "../../helpers/lightbox";
import { useStackDrag } from "../../helpers/stack/useStackDrag";

import StackCard from "./StackCard";
import styles from "./styles.module.css";

import { type StackDataProps } from "./types";

type Props = {
  cards: StackDataProps<{
    id: string;
    text?: string;
    icon?: string;
  }>[];
};

const variants = {
  hidden: {},
  shown: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const Stack: React.FC<Props> = ({ cards }) => {
  const hover = useHoverElement<HTMLDivElement>({
    resetsToInitial: true,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [cardsShown, setCardsShown] = useState(cards.toReversed());
  const [pendingSwipe, setPendingSwipe] = useState<null | { velocity: number }>(
    null,
  );

  const totalCards = cards.length;

  //
  // handles what happens after the card is swiped.
  //
  const handleSwipe = (velocity: number) => {
    if (pendingSwipe) {
      return;
    }

    setPendingSwipe({
      velocity,
    });
  };

  const finalizeSwipe = () => {
    if (!pendingSwipe) {
      return;
    }

    setCardsShown((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentStep((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
    setPendingSwipe(null);
  };

  //
  // Tracking if user intends to replay the stack again
  //
  const handleClickRefresh = () => {
    handleSwipe(1);
  };

  const { onDragEnd } = useStackDrag({
    length: totalCards,
    onSwipe: handleSwipe,
  });

  return (
    <motion.div
      ref={hover.hoverElementRef}
      className={`ui-stack ${styles.wrapper}`}
      onPointerMove={hover.onPointerMove}
      onPointerLeave={hover.onPointerLeave}
      variants={variants}
      initial="hidden"
      animate="shown"
    >
      <StackProgressToolbar
        bars={[
          {
            progress: (currentStep + 1) / totalCards,
            text: `${currentStep + 1} / ${totalCards}`,
          },
        ]}
        forwardButtonProps={{
          isShown: currentStep < totalCards - 1,
          onClick: handleClickRefresh,
        }}
        refreshButtonProps={{
          isShown: currentStep === totalCards - 1,
          onClick: handleClickRefresh,
        }}
      />

      {cardsShown.map((card, cardIndex) => (
        <StackCard
          key={card.id}
          {...card}
          index={cardsShown.length - 1 - cardIndex}
          moveX={hover.x}
          moveY={hover.y}
          isSwipingOut={
            cardsShown.length - 1 - cardIndex === 0 && !!pendingSwipe
          }
          swipeVelocity={pendingSwipe ? pendingSwipe.velocity : 0}
          onDragEnd={onDragEnd}
          onSwipeOutComplete={finalizeSwipe}
        />
      ))}
    </motion.div>
  );
};

export default Stack;
