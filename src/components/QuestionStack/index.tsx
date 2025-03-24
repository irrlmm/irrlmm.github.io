import React, { useEffect, useState } from "react";
import StackProgressToolbar from "../StackProgressToolbar";
import AnimatedQuestion from "./AnimatedQuestion";
import styles from "../CardStack/styles.module.css";
import { motion } from "framer-motion";

export type AnswerOption = {
  label: string;
  response: {
    type: "positive" | "negative";
    title: string;
    text: string;
  };
};

export type QuestionType = {
  id: string;
  image: string;
  text: string;
  options: AnswerOption[];
};

type Props = {
  questions: QuestionType[];
  isLandscape?: boolean;
};

const QuestionStack: React.FC<Props> = ({ questions, isLandscape }) => {
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

  return (
    <div className={styles.wrapper}>
      <StackProgressToolbar
        currentStep={currentStep}
        totalSteps={questions.length}
        hasViewedAll={hasViewedAll}
        onClickRefresh={handleClickRefresh}
        enableRefresh={cardsShown.length === 0}
      />

      <div
        className={`${styles.container} ${
          isLandscape ? styles.containerLandscape : undefined
        }`}
      >
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
            className="col gap-32 align-center padding-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="col gap-8 align-center">
              <h3>Thank you for your time.</h3>
              <p className="body-m color-secondary">
                Thank you for participating in this quiz 🖤
              </p>
            </div>

            <div className="col gap-8 align-center">
              <span className="body-m color-secondary">
                Right answers:{" "}
                <span className="color-accent">{rightCount}</span>
              </span>

              <span className="body-m color-secondary">
                Wrong answers:{" "}
                <span className="color-accent">{wrongCount}</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionStack;
