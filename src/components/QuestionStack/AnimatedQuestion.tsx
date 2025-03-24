import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import type { QuestionType, AnswerOption } from ".";
import styles from "../CardStack/styles.module.css";
import innerStyles from "./styles.module.css";
import Svg from "../Svg";
import { SVG_CHECK, SVG_DEFAULT } from "../../consts/svg";

type Props = {
  index: number;
  question: QuestionType;
  isActive: boolean;
  onRight: () => void;
  onWrong: () => void;
};

const AnimatedQuestion: React.FC<Props> = ({
  index,
  question,
  isActive,
  onRight,
  onWrong,
}) => {
  const [answer, setAnswer] = useState<null | AnswerOption>();

  const deviateX = 100;
  const baseX = Math.random() * deviateX - deviateX / 2;
  const baseY = Math.abs(baseX) / 4;

  const v = useRef(0);

  const controls = useAnimation();
  const x = useMotionValue(baseX);
  const rotateZ = useTransform(x, [-100, 0, 100], [5, 0, -5], {
    clamp: false,
  });

  const variants = {
    idle: {
      x: baseX,
      y: baseY,
      scale: 0.98,
      filter: `blur(${2.5 * index}px)`,
      boxShadow: "0 0 0 1px rgba(128, 128, 128, 0.1)",
    },
    active: {
      x: 0,
      y: 0,
      filter: "blur(0.0px)",
      boxShadow: "0 0 0 1px rgba(128, 128, 128, 0.3)",
    },
    swipeR: {
      x: 800,
    },
    swipeL: {
      x: -800,
    },
  };

  const contentVariants = {
    hide: {
      // filter: `blur(5px)`,
      opacity: 0,
    },
    show: {
      // filter: "blur(0.0px)",
      opacity: 1,
    },
  };

  useEffect(() => {
    if (isActive) {
      controls.start(isActive ? "active" : "idle");
    } else {
      controls.start("idle");
    }
  }, [isActive, index]);

  const swipeAway = (variant: "swipeL" | "swipeR") => {
    controls.start(variant, { duration: 0.25 }).finally(() => {
      if (answer?.response.type === "positive") {
        onRight();
      }
      if (answer?.response.type === "negative") {
        onWrong();
      }
    });
  };

  const handleClickAnswer = (o: AnswerOption) => {
    controls.start(
      { rotateY: "180deg" },
      { type: "spring", delay: 0.1, bounce: 0.3, duration: 1 }
    );
    setAnswer(o);
  };

  const handleClickContinue = () => {
    swipeAway(Math.random() * 2 - 1 > 0 ? "swipeR" : "swipeL");
  };

  return (
    <motion.div
      className={styles.card}
      animate={controls}
      variants={variants}
      style={{
        x,
        rotateZ,
      }}
      transition={{
        type: "spring",
        delay: 0.01,
        bounce: 0.1,
        duration: 0.5,
      }}
    >
      <motion.div
        className={innerStyles.cardContentWrapper}
        animate={answer ? "hide" : "show"}
        variants={contentVariants}
        style={{ pointerEvents: answer ? "none" : "auto" }}
      >
        <span className="body-s color-secondary">Question</span>

        <h3>{question.text}</h3>

        <div className="col gap-8">
          {question.options.map((o) => (
            <motion.button
              key={o.label}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
              className={innerStyles.button}
              data-primary={isActive}
              disabled={!isActive}
              onClick={() => handleClickAnswer(o)}
            >
              {o.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={innerStyles.cardContentWrapper}
        initial={"hide"}
        animate={answer ? "show" : "hide"}
        transition={{ delay: 0.4 }}
        variants={contentVariants}
        style={{ pointerEvents: answer ? "auto" : "none", scaleX: -1 }}
      >
        <div className="row gap-8">
          <span className="body-s color-secondary">{">"}</span>
          <span className="flex-1 body-s">{answer?.label}</span>
        </div>

        <div className="col gap-16 align-center">
          <Svg
            d={answer?.response.type === "positive" ? SVG_CHECK : SVG_DEFAULT}
            size={48}
            strokeWidth={3}
            stroke="var(--accent)"
          />

          <h3>{answer?.response.title}</h3>

          <p className="body-s color-secondary">{answer?.response.text}</p>
        </div>

        <button className={innerStyles.button} onClick={handleClickContinue}>
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedQuestion;
