import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import innerStyles from "./styles.module.css";
import { SVG_CHECK, SVG_DEFAULT } from "../../consts/svg";
import type { CollectionEntry } from "astro:content";
import Svg from "../Svg";

type Question = CollectionEntry<"quiz">["data"]["questions"][0];
type AnswerOption =
  CollectionEntry<"quiz">["data"]["questions"][0]["options"][0];

type Props = {
  index?: number;
  card: Question;
  onClick?: (isRight: boolean) => void;
};

const AnimatedQuestion: React.FC<Props> = ({
  index,
  card: question,
  onClick,
}) => {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0, scale: 0.98 },
    shown: { filter: "blur(0px)", opacity: 1, scale: 1 },
  };

  const [answer, setAnswer] = useState<AnswerOption>();

  const handleClickAnswer = (option: AnswerOption) => {
    setAnswer(option);
  };

  const handleClickContinue = () => {
    if (onClick) {
      onClick(answer?.response.type === "positive");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!answer ? (
        <motion.div
          key="question"
          className={innerStyles.card}
          variants={variants}
          initial="hidden"
          animate="shown"
          exit="hidden"
        >
          <div className="col gap-s">
            <p className={innerStyles.question}>{question.text}</p>

            <div className="row gap-xs">
              <span>{">"}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: index === 0 ? 1 : 0 }}
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
            {question.options.map((o) => (
              <motion.button
                key={o.label}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
                className={innerStyles.button}
                onClick={() => handleClickAnswer(o)}
              >
                {o.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="answer"
          className={innerStyles.card}
          variants={variants}
          initial="hidden"
          animate="shown"
          exit="hidden"
        >
          <div className={innerStyles.result}>
            <span>
              {"> "}
              {answer?.label}
            </span>

            <span className={innerStyles.response}>
              {answer?.response.title}
            </span>

            <p>{answer?.response.text}</p>
          </div>

          <motion.button
            className={innerStyles.button}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
            onClick={handleClickContinue}
          >
            Continue
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedQuestion;
