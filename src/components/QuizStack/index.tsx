import type { CollectionEntry } from "astro:content";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import StackProgressToolbar from "../StackProgressToolbar";
import QuizItem from "./QuizItem";
import QuizIntro from "../ScreenIntro";
import QuizOutro from "./QuizOutro";

import { SVG_GEM } from "../../consts/svg";

import styles from "../CardStack/styles.module.css";
import innerStyles from "./styles.module.css";
import AnimatedCard from "../AnimatedCard";

type Props = {
  data: CollectionEntry<"quiz">["data"];
};

const QuizStack: React.FC<Props> = ({ data: { intro, outro, questions } }) => {
  const [isIntroShown, setIsIntroShown] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [shouldSwipe, setShouldSwipe] = useState(false);

  const [cardsShown, setCardsShown] = useState(questions.toReversed());
  const [hasViewedAll, setHasViewedAll] = useState(false);

  useEffect(() => {
    if (currentStep === questions.length && !hasViewedAll) {
      setHasViewedAll(true);
    }
  }, [currentStep]);

  const handleClickRefresh = () => {
    setCardsShown(questions.toReversed());
    setCurrentStep(0);
    setRightCount(0);
    setHasViewedAll(false);
    setIsIntroShown(true);
  };

  const handleSwipe = () => {
    setShouldSwipe(false);
    setCurrentStep((s) => (s += 1));
    setCardsShown([...cardsShown.slice(0, -1)]);
  };

  const handleCardClick = (isRight: boolean) => {
    setShouldSwipe(true);
    if (isRight) {
      setRightCount((r) => (r += 1));
    }
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
            progress: currentStep / questions.length,
            text: `${currentStep} / ${questions.length}`,
          },
          {
            icon: SVG_GEM,
            text: rightCount.toString(),
          },
        ]}
        refreshButtonProps={{
          isShown: cardsShown.length === 0,
          onClick: handleClickRefresh,
        }}
      />

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          shown: { opacity: 1 },
        }}
      >
        <AnimatePresence mode="wait">
          {isIntroShown && (
            <QuizIntro
              key="intro"
              tag="quiz"
              title={intro.title}
              text={intro.text}
              onClick={() => {
                setIsIntroShown(false);
              }}
            />
          )}

          {!isIntroShown && cardsShown.length > 0 && (
            <motion.div
              key="cards"
              className={styles.container}
              variants={{
                hidden: { opacity: 0 },
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
                  isDraggable={false}
                  index={cardsShown.length - 1 - i}
                  card={card}
                  onSwipe={handleSwipe}
                  onClick={handleCardClick}
                  isRemovable={true}
                  shouldSwipe={i === cardsShown.length - 1 && shouldSwipe}
                  renderItem={QuizItem}
                />
              ))}
            </motion.div>
          )}

          {!isIntroShown && cardsShown.length === 0 && (
            <QuizOutro
              outro={outro}
              rightCount={rightCount}
              questions={questions}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default QuizStack;
