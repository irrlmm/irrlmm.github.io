import React, { useEffect, useState } from "react";
import StackProgressToolbar from "../StackProgressToolbar";
import AnimatedQuestion from "../AnimatedQuestion";
import styles from "../CardStack/styles.module.css";

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
          <div>
            Right answers: {rightCount}. Wrong answers: {wrongCount}.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionStack;
