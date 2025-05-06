import React, { useState } from "react";

import AnimatedQuestion from "../AnimatedQuestion";

type Props = {
  index?: number;
  card: UI.Quiz.GameQuestion;
  onClick?: (points: number) => void;
};

const QuizItem: React.FC<Props> = ({ card: question, onClick }) => {
  const [answer, setAnswer] = useState<UI.Quiz.GameQuestion["options"][0]>();

  const handleClickAnswer = (option: UI.Quiz.GameQuestion["options"][0]) => {
    setAnswer(option);
  };

  const handleClickContinue = () => {
    if (answer && onClick) {
      onClick(answer.points);
    }
  };

  return (
    <AnimatedQuestion
      text={question.text}
      options={question.options}
      answer={answer}
      onClickOption={handleClickAnswer}
      onClickAfter={handleClickContinue}
    />
  );
};

export default QuizItem;
