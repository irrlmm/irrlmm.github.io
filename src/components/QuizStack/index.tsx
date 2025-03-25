import React, { useEffect, useState } from "react";
import StackProgressToolbar from "../StackProgressToolbar";
import AnimatedQuestion from "./AnimatedQuestion";
import { motion } from "framer-motion";

import type { CollectionEntry } from "astro:content";

import styles from "../CardStack/styles.module.css";
import innerStyles from "./styles.module.css";

type Props = {
  data: CollectionEntry<"quiz">["data"];
};

const QuizStack: React.FC<Props> = ({ data: { questions, endMessages } }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [cardsShown, setCardsShown] = useState(questions.toReversed());
  const [hasViewedAll, setHasViewedAll] = useState(false);

  useEffect(() => {
    if (currentStep === questions.length && !hasViewedAll) {
      setHasViewedAll(true);
    }
  }, [currentStep]);

  const nextQuestion = () => {
    setCardsShown([...cardsShown.slice(0, -1)]);
    setCurrentStep((s) => (s += 1));
  };

  const handleClickRefresh = () => {
    setCardsShown(questions.toReversed());
    setCurrentStep(0);
    setRightCount(0);
    setWrongCount(0);
  };

  const handleRight = () => {
    setRightCount((r) => (r += 1));
    nextQuestion();
  };

  const handleWrong = () => {
    setWrongCount((w) => (w += 1));
    nextQuestion();
  };

  const allPositiveCount = questions.filter((q) =>
    q.options.some((o) => o.response.type === "positive")
  ).length;

  const completionPercent = Math.round((rightCount / allPositiveCount) * 100);

  return (
    <div className={styles.wrapper}>
      <StackProgressToolbar
        currentStep={currentStep}
        totalSteps={questions.length}
        hasViewedAll={hasViewedAll}
        onClickRefresh={handleClickRefresh}
        enableRefresh={cardsShown.length === 0}
        gems={rightCount}
      />

      <div className={styles.container}>
        {cardsShown.map((question, i) => (
          <AnimatedQuestion
            key={question.id}
            index={cardsShown.length - 1 - i}
            isActive={i === cardsShown.length - 1}
            question={question}
            onRight={handleRight}
            onWrong={handleWrong}
          />
        ))}

        {cardsShown.length === 0 && (
          <motion.div
            className={innerStyles.resultWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>
              {
                endMessages[wrongCount === 0 ? "allCorrect" : "someCorrect"]
                  .title
              }
            </h3>

            <span className={innerStyles.score}>{completionPercent}%</span>

            <div className="col gap-16">
              <span className={innerStyles.resultText}>
                You earned {rightCount} 💎
              </span>

              <span className={innerStyles.resultText}>
                {
                  endMessages[wrongCount === 0 ? "allCorrect" : "someCorrect"]
                    .text
                }
                <br />
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizStack;
