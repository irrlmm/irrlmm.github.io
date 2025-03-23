import React, { useEffect, useState } from "react";
import AnimatedCard from "./AnimatedCard";
import StackProgressToolbar from "../StackProgressToolbar";
import styles from "./styles.module.css";

type GenericCard<T> = T & {
  id: string;
};

export type GenericCardContent<T> = {
  card: T;
  isActive: boolean;
};

type Props<T> = {
  cards: GenericCard<T>[];
  renderItem: React.FC<GenericCardContent<T>>;
  isLandscape?: boolean;
};

const CardStack = <T,>({
  cards,
  renderItem: CardContent,
  isLandscape,
}: Props<T>) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cardsShown, setCardsShown] = useState(cards.toReversed());
  const [shouldSwipe, setShouldSwipe] = useState(false);
  const [hasViewedAll, setHasViewedAll] = useState(false);

  useEffect(() => {
    if (currentStep === cards.length && !hasViewedAll) {
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
    <div className={styles.wrapper}>
      <StackProgressToolbar
        currentStep={currentStep}
        totalSteps={cards.length}
        hasViewedAll={hasViewedAll}
        onClickRefresh={handleClickRefresh}
      />

      <div
        className={`${styles.container} ${
          isLandscape ? styles.containerLandscape : undefined
        }`}
      >
        {cardsShown.map((card, i) => (
          <AnimatedCard
            key={card.id}
            index={cardsShown.length - 1 - i}
            isActive={i === cardsShown.length - 1}
            onSwipeLeft={handleSwipe}
            onSwipeRight={handleSwipe}
            card={card}
            renderItem={CardContent}
            shouldSwipe={i === cardsShown.length - 1 && shouldSwipe}
          />
        ))}
      </div>
    </div>
  );
};

export default CardStack;
