import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from "../CardStack/styles.module.css";
import innerStyles from "./styles.module.css";
import Svg from "../Svg";
import { SVG_CHECK, SVG_DEFAULT } from "../../consts/svg";
import type { CollectionEntry } from "astro:content";

type Question = CollectionEntry<"quiz">["data"]["questions"][0];
type Answer = CollectionEntry<"quiz">["data"]["questions"][0]["options"][0];

type Props = {
  index: number;
  question: Question;
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
  const [answer, setAnswer] = useState<Answer>();

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
    initial: {
      x: baseX * 20,
      y: baseY * 2,
      scale: 0.9,
      filter: `blur(20px)`,
      opacity: 0.8,
    },
    idle: {
      x: baseX,
      y: baseY,
      scale: 0.98,
      filter: `blur(${2.5 * index}px)`,
      boxShadow: "0 0 0 1px rgba(128, 128, 128, 0.1)",
      opacity: 1,
    },
    active: {
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0.0px)",
      boxShadow: "0 0 0 1px var(--on-surface)",
      opacity: 1,
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
      opacity: 0,
    },
    show: {
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

  const handleClickAnswer = (o: Answer) => {
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
      initial={"initial"}
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

        <p className={innerStyles.question}>{question.text}</p>

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

          <h4>{answer?.response.title}</h4>

          <p className="body-s color-secondary">{answer?.response.text}</p>
        </div>

        <button
          className={innerStyles.button}
          onClick={handleClickContinue}
          data-primary
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedQuestion;
