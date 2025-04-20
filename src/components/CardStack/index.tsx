import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnimatedCard, {
  type GenericCard,
  type GenericCardContent,
} from "../AnimatedCard";
import StackProgressToolbar from "../StackProgressToolbar";

import styles from "./styles.module.css";
import trackEvent from "../../helpers/trackEvent";

type Props<T> = {
  id: string;
  cards: GenericCard<T>[];
  renderItem: React.FC<GenericCardContent<T>>;
};

const CardStack = <T,>({ id, cards, renderItem: CardContent }: Props<T>) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [started, setStarted] = useState(false);
  const [cardsShown, setCardsShown] = useState(cards.toReversed());
  const [shouldSwipe, setShouldSwipe] = useState(false);

  const [completeCount, setCompleteCount] = useState(0);
  const [replayCount, setReplayCount] = useState(0);
  const [passedHalfway, setPassedHalfway] = useState(false);

  const [cardTimestamp, setCardTimestamp] = useState<null | number>(null);

  useEffect(() => {
    if (!passedHalfway && currentStep > cards.length / 2) {
      setPassedHalfway(() => {
        trackEvent("site:cardstack_halfway", { id });
        return true;
      });
    }
  }, [currentStep, passedHalfway]);

  useEffect(() => {
    if (replayCount === 0 && currentStep === 1) {
      setStarted(() => {
        trackEvent("site:cardstack_started", { id });
        return true;
      });
      setCardTimestamp(Date.now());
    }

    if (currentStep === cardsShown.length - 1) {
      setCompleteCount((n) => {
        trackEvent("site:cardstack_completed", { id, times_completed: n + 1 });
        return n + 1;
      });
    }
  }, [replayCount, currentStep]);

  useEffect(() => {
    if (completeCount > 0 && currentStep === 0) {
      setReplayCount((n) => {
        trackEvent("site:cardstack_replayed", { id, times_replayed: n + 1 });
        return n + 1;
      });
    }
  }, [completeCount, currentStep]);

  //
  // handles what happens after the card is swiped.
  //
  const handleSwipe = () => {
    setShouldSwipe(false);
    setCardsShown([
      cardsShown[cardsShown.length - 1],
      ...cardsShown.slice(0, -1),
    ]);

    setCurrentStep((s) => (s === cards.length - 1 ? 0 : (s += 1)));

    setCardTimestamp((t) => {
      const newTime = Date.now();
      if (t !== null) {
        trackEvent("site:cardstack_card_viewed", {
          id,
          card_id: cards[currentStep].id,
          time_spent: newTime - t,
        });
      }
      return newTime;
    });
  };

  //
  // Tracking if user intends to replay the stack again
  //
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
            progress: (currentStep + 1) / cards.length,
            text: `${currentStep + 1} / ${cards.length}`,
          },
        ]}
        forwardButtonProps={{
          isShown: currentStep < cards.length - 1,
          onClick: handleClickRefresh,
        }}
        refreshButtonProps={{
          isShown: currentStep === cards.length - 1,
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
            trackMeta={{
              started,
              replayCount,
              passedHalfway,
              completeCount,
              cardTimestamp,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CardStack;
