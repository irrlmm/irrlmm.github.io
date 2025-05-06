import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./styles.module.css";

type Props = {
  text: string;
  options: any[];
  answer?: {
    id: string;
    label: string;
    response: {
      title: string;
      text: string;
      [x: string]: any;
    };
  };
  onClickOption: (payload?: any) => void;
  onClickAfter?: () => void;
  buttonAfterLabel?: string;
};

const AnimatedQuestion: React.FC<Props> = ({
  text,
  options,
  answer,
  onClickOption,
  onClickAfter,
  buttonAfterLabel = "Continue",
}) => {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0, scale: 0.98 },
    shown: { filter: "blur(0px)", opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence mode="wait">
      {!answer ? (
        <motion.div
          key="question"
          className={styles.card}
          variants={variants}
          initial="hidden"
          animate="shown"
          exit="hidden"
        >
          <div className="col gap-s">
            <p className={styles.question}>{text}</p>

            <div className="row gap-xs">
              <span>{">"}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.33,
                }}
              >
                _
              </motion.span>
            </div>
          </div>

          <div className="col gap-xs">
            {options.map((o) => (
              <motion.button
                key={o.id}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
                className={styles.button}
                onClick={() => onClickOption(o)}
              >
                {o.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="answer"
          className={styles.card}
          variants={variants}
          initial="hidden"
          animate="shown"
          exit="hidden"
        >
          <div className={styles.result}>
            <span>
              {"> "}
              {answer.label}
            </span>

            <span className={styles.response}>{answer.response.title}</span>

            <p>{answer.response.text}</p>
          </div>

          {onClickAfter && (
            <motion.button
              className={styles.button}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
              onClick={onClickAfter}
            >
              {buttonAfterLabel}
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedQuestion;
