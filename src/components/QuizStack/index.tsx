import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import StackProgressToolbar from "../StackProgressToolbar";
import AnimatedCard from "../AnimatedCard";
import QuizItem from "./QuizItem";
import QuizIntro from "../ScreenIntro";
import QuizOutro from "./QuizOutro";

import { SVG_KEY } from "../../consts/svg";

import styles from "../CardStack/styles.module.css";
import trackEvent from "../../helpers/trackEvent";

type Props = {
  quiz: UI.Quiz.Game;
};

const QuizStack: React.FC<Props> = ({ quiz }) => {
  const [isIntroShown, setIsIntroShown] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);
  const [points, setPoints] = useState(0);
  const [shouldSwipe, setShouldSwipe] = useState(false);

  const [cardsShown, setCardsShown] = useState(quiz.questions.toReversed());

  const [_, setCompleteCount] = useState(0);
  const [replayCount, setReplayCount] = useState(0);
  const [passedHalfway, setPassedHalfway] = useState(false);

  const [cardTimestamp, setCardTimestamp] = useState<null | number>(null);

  useEffect(() => {
    if (!isIntroShown && cardsShown.length === 0) {
      setCompleteCount((n) => {
        trackEvent("site:quiz_completed", {
          id: quiz.id,
          times_completed: n + 1,
        });
        return n + 1;
      });
    }
  }, [isIntroShown, cardsShown]);

  useEffect(() => {
    if (!passedHalfway && currentStep > cardsShown.length / 2) {
      setPassedHalfway(() => {
        trackEvent("site:quiz_halfway", { id: quiz.id });
        return true;
      });
    }
  }, [isIntroShown, passedHalfway, cardsShown]);

  const handleBeginQuiz = () => {
    setIsIntroShown(false);
    setCurrentStep(0);
    setCardTimestamp(Date.now());
    if (replayCount === 0) {
      trackEvent("site:quiz_started", { id: quiz.id });
    }
  };

  const handleClickRefresh = () => {
    setCardsShown(quiz.questions.toReversed());
    setCurrentStep(0);
    setPoints(0);
    setReplayCount((n) => {
      trackEvent("site:quiz_replayed", {
        id: quiz.id,
        times_replayed: n + 1,
      });
      return n + 1;
    });
  };

  const handleCardClick = (points: number) => {
    setPoints((p) => {
      if (cardTimestamp) {
        trackEvent("site:quiz_card_answered", {
          id: quiz.id,
          card_id: quiz.questions[currentStep].id,
          time_spent: Date.now() - cardTimestamp,
        });
      }
      return p + points;
    });
    setShouldSwipe(true);
  };

  const handleSwipe = () => {
    setShouldSwipe(false);
    setCurrentStep((s) => (s += 1));
    setCardsShown([...cardsShown.slice(0, -1)]);
    setCardTimestamp(Date.now());
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
            progress: currentStep / quiz.questions.length,
            text: `${currentStep} / ${quiz.questions.length}`,
          },
          {
            icon: SVG_KEY,
            text: points < 0 ? "0" : points.toString(),
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
              title={quiz.intro.title}
              text={quiz.intro.text}
              onClick={handleBeginQuiz}
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
              points={points}
              winScore={quiz.winScore}
              outro={quiz.outro}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default QuizStack;
