import { motion, type MotionValue } from "framer-motion";
import { type FC } from "react";
import { getStackCardVariants } from "../../helpers/stack/getStackCardVariants";
import { useStackHover } from "../../helpers/stack/useStackHover";
import type { QuizGameQuestion } from "../../types/content";

import AnimatedParagraph from "../AnimatedParagraph";
import styles from "./styles.module.css";

type Props = {
  card: QuizGameQuestion;
  index: number;
  onAnswer: (points: number) => void;
  onClose: () => void;
  moveX: MotionValue<number>;
  moveY: MotionValue<number>;
};

const CardQuiz: FC<Props> = ({ card, index, moveX, moveY }) => {
  const { variants } = getStackCardVariants(index);

  const { translateX, translateY, rotate } = useStackHover({
    index,
    moveX,
    moveY,
  });

  return (
    <motion.div
      className={`ui-card ${styles.container}`}
      variants={variants}
      style={{
        translateX,
        translateY,
        rotate,
      }}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <motion.div
        key="question"
        className={styles.content}
        initial={{ filter: "blur(0.5rem)", opacity: 0, scale: 0.98 }}
        animate={{ filter: "blur(0rem)", opacity: 1, scale: 1 }}
      >
        <div className="col gap-4">
          <AnimatedParagraph
            text={card.text}
            key="question"
            animate={index === 0}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CardQuiz;
