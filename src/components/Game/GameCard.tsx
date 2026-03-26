import { motion } from "framer-motion";
import { useState, type FC } from "react";
import { getStackCardVariants } from "../../helpers/stack/getStackCardVariants";
import type { CardGameCard } from "../../types/content";

import AnimatedParagraph from "../AnimatedParagraph";
import Button from "../Button";

import styles from "./styles.module.css";

type Props = {
  card: CardGameCard;
  index: number;
  onChooseOption: (option: CardGameCard["options"][number]) => void;
};

const GameCard: FC<Props> = ({ card, index, onChooseOption }) => {
  const [answer, setAnswer] = useState<CardGameCard["options"][number]>();
  const [questionShown, setQuestionShown] = useState(false);
  const [responseShown, setResponseShown] = useState(false);

  const { variants } = getStackCardVariants(index);

  const handleContinue = () => {
    if (answer) {
      onChooseOption(answer);
    }
  };

  const handleParagraphAnimationComplete = () => {
    setQuestionShown(true);
  };

  return (
    <motion.div
      className="row gap-2 wrap"
      variants={variants}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <div className={styles.cardImage} />

      <div className="col gap-4">
        <AnimatedParagraph
          text={card.text}
          key={card.id}
          animate={index === 0}
          onAnimationComplete={handleParagraphAnimationComplete}
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
          <p className="kicker overline text-m">{`> ${answer.label}`}</p>
        )}

        {!!answer && (
          <AnimatedParagraph
            text={answer.response.text}
            key={`${card.id}-${answer.label}`}
            onAnimationComplete={() => setResponseShown(true)}
          />
        )}

        <div className={`${styles.actions} row gap-2 wrap`}>
          {!answer &&
            questionShown &&
            card.options.map((option) => (
              <Button
                key={option.id ?? option.label}
                onClick={() => setAnswer(option)}
                label={option.label}
              />
            ))}

          {responseShown && (
            <Button onClick={handleContinue} label="Continue" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
