import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";

import StackProgressToolbar from "../StackProgressToolbar";
import QuizCard from "../QuizCard";
import QuizCoverIntro from "../QuizCoverIntro";
import QuizOutro from "./QuizOutro";

import { SVG_KEY } from "../../consts/svg";

import trackEvent from "../../helpers/trackEvent";

import styles from "./styles.module.css";

export const coverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(0.5rem)",
  },
  shown: {
    opacity: 1,
    scale: 1,
    filter: "blur(0rem)",
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

type Props = {
  quiz: UI.Quiz.Game;
};

const QuizStack: React.FC<Props> = ({ quiz }) => {
  const moveX = useMotionValue(0);
  const moveY = useMotionValue(0);

  const [isIntroShown, setIsIntroShown] = useState(true);

  const [points, setPoints] = useState(0);
  const [cardsShown, setCardsShown] = useState(() =>
    quiz.questions.toReversed(),
  );
  const [, setCompleteCount] = useState(0);
  const [replayCount, setReplayCount] = useState(0);
  const [passedHalfway, setPassedHalfway] = useState(false);
  const [cardTimestamp, setCardTimestamp] = useState<null | number>(null);
  const totalCards = quiz.questions.length;
  const currentStep = totalCards - cardsShown.length;
  const activeCard = cardsShown[cardsShown.length - 1];

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
    if (!passedHalfway && currentStep > totalCards / 2) {
      setPassedHalfway(() => {
        trackEvent("site:quiz_halfway", { id: quiz.id });
        return true;
      });
    }
  }, [passedHalfway, currentStep, totalCards, quiz.id]);

  const handleBeginQuiz = () => {
    setIsIntroShown(false);
    setCardTimestamp(Date.now());
    if (replayCount === 0) {
      trackEvent("site:quiz_started", { id: quiz.id });
    }
  };

  const handleClickRefresh = () => {
    setCardsShown(() => quiz.questions.toReversed());
    setPoints(0);
    setPassedHalfway(false);
    setCardTimestamp(Date.now());
    setReplayCount((n) => {
      trackEvent("site:quiz_replayed", {
        id: quiz.id,
        times_replayed: n + 1,
      });
      return n + 1;
    });
  };

  const handleContainerPointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width || 1;
    const height = rect.height || 1;
    const normalizedX = ((event.clientX - rect.left) / width - 0.5) * 2;
    const normalizedY = ((event.clientY - rect.top) / height - 0.5) * 2;
    moveX.set(normalizedX);
    moveY.set(normalizedY);
  };

  const handleContainerPointerLeave = () => {
    animate(moveX, 0, { type: "spring", stiffness: 260, damping: 24 });
    animate(moveY, 0, { type: "spring", stiffness: 260, damping: 24 });
  };

  const handleCardClick = (points: number) => {
    if (activeCard && cardTimestamp) {
      trackEvent("site:quiz_card_answered", {
        id: quiz.id,
        card_id: activeCard.id,
        time_spent: Date.now() - cardTimestamp,
      });
    }

    setPoints((p) => {
      return p + points;
    });
  };

  const handleCloseCard = () => {
    setCardsShown((prev) => prev.slice(0, -1));
    setCardTimestamp(Date.now());
  };

  return (
    <motion.div
      className={`ui ${styles.wrapper}`}
      variants={{
        hidden: {},
        shown: {
          transition: {
            delayChildren: 0.15,
          },
        },
      }}
      initial="hidden"
      animate="shown"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          shown: { opacity: 1 },
        }}
      >
        <StackProgressToolbar
          bars={[
            {
              progress: currentStep / totalCards,
              text: `${currentStep} / ${totalCards}`,
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

        <AnimatePresence mode="wait" presenceAffectsLayout>
          {isIntroShown && (
            <QuizCoverIntro
              key="intro"
              title={quiz.intro.title}
              text={quiz.intro.text}
              onClick={handleBeginQuiz}
            />
          )}

          {!isIntroShown && cardsShown.length > 0 && (
            <motion.div
              key="cards"
              className={styles.container}
              onPointerMove={handleContainerPointerMove}
              onPointerLeave={handleContainerPointerLeave}
              variants={coverVariants}
              initial="hidden"
              animate="shown"
              exit="hidden"
            >
              <AnimatePresence>
                {cardsShown.map((card, cardIndex) => (
                  <QuizCard
                    key={card.id}
                    index={cardsShown.length - 1 - cardIndex}
                    card={card}
                    onAnswer={handleCardClick}
                    onClose={handleCloseCard}
                    moveX={moveX}
                    moveY={moveY}
                  />
                ))}
              </AnimatePresence>
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
