import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import StackProgressToolbar from "../StackProgressToolbar";
import QuizCard from "./QuizCard";
import QuizIntro from "./QuizIntro";
import QuizOutro from "./QuizOutro";

import { SVG_KEY } from "../../consts/svg";

import { useHoverElement } from "../../helpers/lightbox";

import styles from "./styles.module.css";

export const coverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(0.5rem)",
  },
  shown: {
    opacity: 1,
    scale: 1,
    filter: "blur(0rem)",
    transition: {
      delay: 0.25,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(0.5rem)",
  },
  shown: {
    opacity: 1,
    filter: "blur(0rem)",
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
    },
  },
};

type Props = {
  quiz: UI.Quiz.Game;
};

const Quiz: React.FC<Props> = ({ quiz }) => {
  const [isIntroShown, setIsIntroShown] = useState(true);
  const [points, setPoints] = useState(0);

  const hover = useHoverElement<HTMLDivElement>({
    resetsToCenter: true,
  });

  const [cardsShown, setCardsShown] = useState(() =>
    quiz.questions.toReversed(),
  );

  const totalCards = quiz.questions.length;
  const currentStep = totalCards - cardsShown.length;

  const handleBeginQuiz = () => {
    setIsIntroShown(false);
  };

  const handleClickRefresh = () => {
    setCardsShown(() => quiz.questions.toReversed());
    setPoints(0);
  };

  const handleCardClick = (points: number) => {
    setPoints((p) => {
      return p + points;
    });
  };

  const handleCloseCard = () => {
    setCardsShown((prev) => prev.slice(0, -1));
  };

  return (
    <motion.div
      className={`ui-stack ${styles.wrapper}`}
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
      {!isIntroShown && (
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
      )}

      <AnimatePresence mode="wait" presenceAffectsLayout>
        {isIntroShown && (
          <QuizIntro
            key="intro"
            title={quiz.intro.title}
            text={quiz.intro.text}
            onClick={handleBeginQuiz}
          />
        )}

        {!isIntroShown && cardsShown.length > 0 && (
          <motion.div
            ref={hover.wrapperRef}
            key="cards"
            className={styles.wrapper}
            onPointerMove={hover.onPointerMove}
            onPointerLeave={hover.onPointerLeave}
            variants={cardVariants}
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
                  moveX={hover.x}
                  moveY={hover.y}
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
  );
};

export default Quiz;
