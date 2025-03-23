import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef } from "react";
import type { QuestionType } from "../QuestionStack";
import styles from "../CardStack/styles.module.css";
import innerStyles from "./styles.module.css";

type Props = {
  index: number;
  question: QuestionType;
  isActive: boolean;
  onRight: () => void;
  onWrong: () => void;
  onClickContinue: () => void;
};

const AnimatedQuestion: React.FC<Props> = ({
  index,
  question,
  isActive,
  onRight,
  onWrong,
  onClickContinue,
}) => {
  const deviateX = 100;
  const baseX = Math.random() * deviateX - deviateX / 2;
  const baseY = Math.abs(baseX) / 4;

  const v = useRef(0);

  const controls = useAnimation();
  const x = useMotionValue(baseX);
  const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5], {
    clamp: false,
  });

  const variants = {
    idle: {
      x: baseX,
      y: baseY,
      scale: 0.98,
      filter: `blur(${2 * index}px)`,
      boxShadow: "0 0 0 1px rgba(128, 128, 128, 0.1)",
    },
    active: {
      x: 0,
      y: 0,
      filter: "blur(0.0px)",
      boxShadow: "0 0 0 1px rgba(128, 128, 128, 0.3)",
    },
    swipeR: {
      x: 500,
    },
    swipeL: {
      x: -500,
    },
  };

  useEffect(() => {
    if (isActive) {
      controls.start(isActive ? "active" : "idle");
    } else {
      controls.start("idle");
    }
  }, [isActive, index]);

  const handleDrag = () => {
    v.current = x.getVelocity();
  };

  const swipeAway = (variant: "swipeL" | "swipeR") => {
    controls.start(variant, { duration: 0.2 }).finally(() => {
      switch (variant) {
        case "swipeL":
          onRight();
          break;
        case "swipeR":
          onWrong();
          break;
        default:
          break;
      }
    });
  };

  return (
    <motion.div
      className={`${styles.card} ${isActive && styles.cardActive}`}
      animate={controls}
      variants={variants}
      drag={isActive}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      style={{
        x,
        rotate,
      }}
      transition={{
        type: "spring",
        delay: 0.01,
        bounce: 0.1,
        duration: 0.5,
      }}
    >
      <div className={innerStyles.questionCard}>
        <img src={question.image} alt={question.text} />

        <h3>{question.text}</h3>

        <div className="col gap-8">
          {question.options.map((o) => (
            <button key={o.label} className={innerStyles.answer}>
              <span className="body-m">{o.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedQuestion;
