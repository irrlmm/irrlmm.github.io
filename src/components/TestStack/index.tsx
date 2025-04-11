import React, { useState } from "react";
import StackProgressToolbar from "../StackProgressToolbar";
import { animate, motion } from "framer-motion";

// import innerStyles from "./styles.module.css";
import { AnimatePresence } from "framer-motion";
import AnimatedCard from "../AnimatedCard";
import TestCardItem from "./TestCardItem";

import styles from "../CardStack/styles.module.css";
import type { TEST_SCHEMA } from "../../consts/tests";
import type { ProgressBarProps } from "../AnimatedProgressBar";
import ScreenIntro from "../ScreenIntro";
import TestOutro from "./TestOutro";

type Props = {
  test: TEST_SCHEMA;
};

const TestStack: React.FC<Props> = ({
  test: { intro, outro, typeStructure, types, questions },
}) => {
  const [isIntroShown, setIsIntroShown] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);
  const [cardsShown, setCardsShown] = useState(questions.toReversed());
  const [shouldSwipe, setShouldSwipe] = useState(false);

  const [results, setResults] = useState(
    Object.fromEntries(types.map((t) => [t.id, 0]))
  );

  const handleClickBegin = () => {
    setIsIntroShown(false);
  };

  const handleSwipe = () => {
    setShouldSwipe(false);
    setCardsShown([...cardsShown.slice(0, -1)]);
  };

  const handleCardClick = (id: string) => {
    setShouldSwipe(true);
    setResults((res) => ({ ...res, [id]: res[id] + 1 }));
    setCurrentStep((s) => (s += 1));
  };

  const handleClickRefresh = () => {
    setResults(Object.fromEntries(types.map((t) => [t.id, 0])));
    setCurrentStep(0);
    setCardsShown(questions.toReversed());
    setIsIntroShown(true);
  };

  const toolbarProps =
    cardsShown.length > 0 && !isIntroShown
      ? types.map(
          (t): ProgressBarProps => ({
            progress: results[t.id] / questions.length,
            text: t.id.toUpperCase(),
            progressType: "block",
          })
        )
      : [];

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
          ...toolbarProps,
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
            <ScreenIntro
              key="intro"
              tag="Test"
              {...intro}
              onClick={handleClickBegin}
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
                  shouldSwipe={i === cardsShown.length - 1 && shouldSwipe}
                  renderItem={TestCardItem}
                  isRemovable={true}
                />
              ))}
            </motion.div>
          )}

          {!isIntroShown && cardsShown.length === 0 && (
            <TestOutro
              key="results"
              outro={outro}
              results={results}
              types={types}
              typeStructure={typeStructure}
              questions={questions}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TestStack;
