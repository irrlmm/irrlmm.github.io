import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState, type FC } from "react";
import { SPRING_CONFIG } from "../../helpers/motion";

import styles from "./styles.module.css";

type Props = {
  card: UI.Quiz.GameQuestion;
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
  const [answer, setAnswer] = useState<UI.Quiz.GameQuestion["options"][0]>();

  const CARD_GAP = 8;
  const MAX_LAYERS = 4;
  const BLUR_STEP = 0.5;
  const TRANSLATE_MAX = 1.5;
  const ROTATE_MAX = 2;

  const offsetX = -1 * index * CARD_GAP;
  const offsetY = -1 * offsetX;

  const blur = index * BLUR_STEP;

  const translateX = useTransform(
    moveX,
    [-1, 1],
    [`${TRANSLATE_MAX * (index + 1)}%`, `${-1 * TRANSLATE_MAX * (index + 1)}%`],
  );

  const translateY = useTransform(
    moveY,
    [-1, 1],
    [
      `${TRANSLATE_MAX * (index + 1)}%`,
      `${-1 * (TRANSLATE_MAX * (index + 1))}%`,
    ],
  );

  const translateXSpring = useSpring(translateX, SPRING_CONFIG);
  const translateYSpring = useSpring(translateY, SPRING_CONFIG);

  const ROTATE_EFFECT = 1;
  const baseRotate = -1 * ROTATE_MAX * index;
  const rotate = useTransform(
    moveX,
    (x) => baseRotate * (1 + x * ROTATE_EFFECT),
  );

  const rotateSpring = useSpring(rotate, SPRING_CONFIG);

  useEffect(() => {
    setAnswer(undefined);
  }, [card.id]);

  const handleContinue = () => {
    if (answer) {
      onAnswer(answer.points);
      onClose();
    }
  };

  const variants = {
    hidden: { x: 0, y: 0, filter: `blur(${blur}px)`, opacity: 0 },
    shown: {
      x: offsetX,
      y: offsetY,
      filter: `blur(${blur}px)`,
      opacity: MAX_LAYERS - index > 0 ? 1 - index * 0.1 : 0,
      transition: {
        type: "spring",
        bounce: 0.1,
        stiffness: 300,
        damping: 20,
      },
    },
    exit: { opacity: 0, scale: 1.1, filter: "blur(1rem)" },
  };

  return (
    <motion.div
      className={styles.card}
      variants={variants}
      style={{
        translateX: translateXSpring,
        translateY: translateYSpring,
        rotate: rotateSpring,
      }}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {!answer ? (
          <motion.div
            key="question"
            className={styles.content}
            initial={{ filter: "blur(0.5rem)", opacity: 0, scale: 0.98 }}
            animate={{ filter: "blur(0rem)", opacity: 1, scale: 1 }}
            exit={{ filter: "blur(0.5rem)", opacity: 0, scale: 0.98 }}
          >
            <div className="col gap-s">
              <p className="overline-m">
                {card.text}
                <br />
                <br />

                {"> "}

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 0.2,
                  }}
                >
                  _
                </motion.span>
              </p>
            </div>

            <div className="row gap-s">
              {card.options.map((option) => (
                <motion.button
                  key={option.id}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
                  className={styles.button}
                  onClick={() => setAnswer(option)}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            className={styles.content}
            initial={{ filter: "blur(1rem)", opacity: 0, scale: 0.98 }}
            animate={{ filter: "blur(0rem)", opacity: 1, scale: 1 }}
            exit={{ filter: "blur(1rem)", opacity: 0, scale: 0.98 }}
          >
            <div className={styles.result}>
              <span>
                {"> "}
                {answer.label}
              </span>

              <span className={styles.response}>{answer.response.title}</span>

              <p>{answer.response.text}</p>
            </div>

            <motion.button
              className={styles.button}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
              onClick={handleContinue}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizCard;
