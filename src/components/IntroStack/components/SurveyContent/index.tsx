import React, { useState } from "react";

import AnimatedQuestion from "../../../AnimatedQuestion";

type Props = {
  card: UI.Card.Survey;
};

const SurveyContent: React.FC<Props> = ({ card }) => {
  const [answer, setAnswer] = useState<(typeof card)["options"][0]>();

  const handleClickAnswer = (option: typeof answer) => {
    if (option) {
      setAnswer(option);
    }
  };

  return (
    <AnimatedQuestion
      text={card.text}
      options={card.options}
      answer={answer}
      onClickOption={handleClickAnswer}
    />
  );
};

export default SurveyContent;
