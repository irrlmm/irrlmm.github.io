import { motion, type MotionValue } from "framer-motion";
import { useState, type FC } from "react";
import { getStackCardVariants } from "../../helpers/stack/getStackCardVariants";
import { useStackHover } from "../../helpers/stack/useStackHover";
import type { QuizGameQuestion } from "../../types/content";

import AnimatedParagraph from "../AnimatedParagraph";
import Button from "../Button";

type Props = {
  card: QuizGameQuestion;
  index: number;
  onAnswer: (points: number) => void;
  onClose: () => void;
  moveX: MotionValue<number>;
  moveY: MotionValue<number>;
};

const QuizCard: FC<Props> = ({
  card,
  index,
  onAnswer,
  onClose,
  moveX,
  moveY,
}) => {
  const [answer, setAnswer] = useState<QuizGameQuestion["options"][0]>();

  const [questionShown, setQuestionShown] = useState(false);
  const [responseShown, setResponseShown] = useState(false);

  const { variants } = getStackCardVariants(index);

  const { translateX, translateY, rotateSpring } = useStackHover({
    index,
    moveX,
    moveY,
  });

  const handleContinue = () => {
    if (answer) {
      onAnswer(answer.points);
      onClose();
      setResponseShown(false);
    }
  };

  return (
    <motion.div
      className={`ui-card col justify-between`}
      variants={variants}
      style={{
        translateX: translateX,
        translateY: translateY,
        rotate: rotateSpring,
      }}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <div className="col gap-4">
        <AnimatedParagraph
          text={card.text}
          key="question"
          animate={index === 0}
          onAnimationComplete={() => setQuestionShown(true)}
        />

        {!answer && questionShown && (
          <p className="overline text-m">
            {">"}
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { repeat: Infinity, duration: 0.3 },
              }}
            >
              {" _"}
            </motion.span>
          </p>
        )}

        {!!answer && (
          <p className="kicker overline text-m">{`> ${answer.label}`}</p>
        )}

        {!!answer && (
          <AnimatedParagraph
            text={answer.response.text}
            key="response"
            onAnimationComplete={() => setResponseShown(true)}
          />
        )}
      </div>

      <div className="row gap-2 wrap">
        {!answer &&
          questionShown &&
          card.options.map((option) => (
            <Button
              key={option.id}
              onClick={() => setAnswer(option)}
              label={option.label}
            />
          ))}

        {responseShown && <Button onClick={handleContinue} label="Continue" />}
      </div>
    </motion.div>
  );
};

export default QuizCard;
