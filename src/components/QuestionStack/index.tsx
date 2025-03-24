import React, { useEffect, useState } from "react";
import StackProgressToolbar from "../StackProgressToolbar";
import AnimatedQuestion from "./AnimatedQuestion";
import styles from "../CardStack/styles.module.css";
import { motion } from "framer-motion";
import innerStyles from "./styles.module.css";

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
            className={innerStyles.resultWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>
              {wrongCount === 0 ? "You nailed it!" : "All done! You scored:"}
            </h3>

            <span className={innerStyles.score}>{completionPercent}%</span>

            <span className={innerStyles.resultText}>
              You earned ${rightCount} 💎
            </span>

            <span className={innerStyles.resultText}>
              {wrongCount === 0
                ? `You know Igor scary well... But hey, there are still hidden gems in the wrong answers. Restart if you're curious.`
                : `Think you can uncover more? Restart and go again.`}
              <br />
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionStack;
