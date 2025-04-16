import AnimatedCard, {
  type GenericCard,
  type GenericCardContent,
} from "../AnimatedCard";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import StackProgressToolbar from "../StackProgressToolbar";

import styles from "./styles.module.css";
import { SVG_GEM } from "../../consts/svg";

type Props<T> = {
  cards: GenericCard<T>[];
  renderItem: React.FC<GenericCardContent<T>>;
};

const CardStack = <T,>({ cards, renderItem: CardContent }: Props<T>) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasViewed, setHasViewedAll] = useState(false);
  const [cardsShown, setCardsShown] = useState(cards.toReversed());
  const [shouldSwipe, setShouldSwipe] = useState(false);

  useEffect(() => {
    if (currentStep === cards.length) {
      setHasViewedAll(true);
    }
  }, [currentStep]);

  const handleSwipe = () => {
    setShouldSwipe(false);
    setCardsShown([
      cardsShown[cardsShown.length - 1],
      ...cardsShown.slice(0, -1),
    ]);

    setCurrentStep((s) => (s === cards.length ? 1 : (s += 1)));
  };

  const handleClickRefresh = () => {
    setShouldSwipe(true);
  };

  return (
    <motion.div
      className={styles.wrapper}
      variants={{
        hidden: {},
        shown: {
          transition: {
            delayChildren: 0.5,
          },
        },
      }}
      initial="hidden"
      animate="shown"
    >
      <StackProgressToolbar
        bars={[
          {
            progress: currentStep / cards.length,
            text: `${currentStep} / ${cards.length}`,
          },
          {
            icon: SVG_GEM,
            text: Number(hasViewed).toString(),
          },
        ]}
        forwardButtonProps={{
          isShown: currentStep !== cards.length,
          onClick: handleClickRefresh,
        }}
        refreshButtonProps={{
          isShown: currentStep === cards.length,
          onClick: handleClickRefresh,
        }}
      />

      <motion.div
        className={styles.container}
        variants={{
          hidden: {
            opacity: 0,
          },
          shown: {
            opacity: 1,
            transition: {
              staggerChildren: 0.033,
              staggerDirection: -1,
            },
          },
        }}
      >
        {cardsShown.map((card, i) => (
          <AnimatedCard
            key={card.id}
            index={cardsShown.length - 1 - i} // reverse index so 0 is active
            onSwipe={handleSwipe}
            card={card}
            renderItem={CardContent}
            shouldSwipe={i === cardsShown.length - 1 && shouldSwipe}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CardStack;
