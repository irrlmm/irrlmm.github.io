import { motion, type MotionValue } from "framer-motion";
import { useState, type FC } from "react";
import { getStackCardVariants } from "../../helpers/stack/getStackCardVariants";
import { useStackHover } from "../../helpers/stack/useStackHover";
import type { CardGameCard } from "../../types/content";

import AnimatedParagraph from "../AnimatedParagraph";
import Button from "../Button";

type Props = {
  card: CardGameCard;
  index: number;
  onChooseOption: (option: CardGameCard["options"][number]) => void;
  moveX: MotionValue<number>;
  moveY: MotionValue<number>;
};

const GameCard: FC<Props> = ({ card, index, onChooseOption, moveX, moveY }) => {
  const [answer, setAnswer] = useState<CardGameCard["options"][number]>();
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
      onChooseOption(answer);
      setResponseShown(false);
      setAnswer(undefined);
    }
  };

  return (
    <motion.div
      className={`ui-card col justify-between`}
      variants={variants}
      style={{
        translateX,
        translateY,
        rotate: rotateSpring,
      }}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <div className="col gap-m">
        <AnimatedParagraph
          text={card.text}
          key={card.id}
          animate={index === 0}
          onAnimationComplete={() => setQuestionShown(true)}
        />

        {!answer && questionShown && (
          <p className="overline text-m">
            {">"}
            <motion.span
              initial={{ opacity: 0 }}
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
          <p className="inverse overline text-m">{`> ${answer.label}`}</p>
        )}

        {!!answer && (
          <AnimatedParagraph
            text={answer.response.text}
            key={`${card.id}-${answer.label}`}
            onAnimationComplete={() => setResponseShown(true)}
          />
        )}
      </div>

      <div className="row gap-s wrap">
        {!answer &&
          questionShown &&
          card.options.map((option) => (
            <Button
              key={option.id ?? option.label}
              onClick={() => setAnswer(option)}
              label={option.label}
            />
          ))}

        {responseShown && <Button onClick={handleContinue} label="Continue" />}
      </div>
    </motion.div>
  );
};

export default GameCard;
