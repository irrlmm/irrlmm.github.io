import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

import styles from "./styles.module.css";

type ScrollFocusParagraphProps = {
  text: string;
  className?: string;
  progressRange?: [number, number];
};

type WordProps = {
  text: string;
  index: number;
  scrollProgress: MotionValue<number>;
  enterStart: number;
  exitStart: number;
};

const MIN_OPACITY = 0.075;
const WORD_STAGGER_STEP = 0.033;
const WORD_FADE_WINDOW = 0.02;
const EPSILON = 0.0001;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const getWordOpacity = (
  scrollProgress: number,
  index: number,
  enterStart: number,
  exitStart: number,
) => {
  const offset = index * WORD_STAGGER_STEP;
  const enterProgress = clamp01(
    (scrollProgress - (enterStart + offset)) / WORD_FADE_WINDOW,
  );
  const exitProgress = clamp01(
    (scrollProgress - (exitStart + offset)) / WORD_FADE_WINDOW,
  );
  const visibility = Math.min(enterProgress, 1 - exitProgress);

  return MIN_OPACITY + visibility * (1 - MIN_OPACITY);
};

const ScrollFocusWord: React.FC<WordProps> = ({
  text,
  index,
  scrollProgress,
  enterStart,
  exitStart,
}) => {
  const opacity = useTransform(scrollProgress, (value) =>
    getWordOpacity(value, index, enterStart, exitStart),
  );
  const opacitySpring = useSpring(opacity, { bounce: 0, duration: 50 });
  const blur = useTransform(opacitySpring, [MIN_OPACITY, 1], [3, 0.5]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.span
      className={styles.word}
      style={{ opacity: opacitySpring, filter }}
    >
      {text}
    </motion.span>
  );
};

const ScrollFocusParagraph: React.FC<ScrollFocusParagraphProps> = ({
  text,
  className,
  progressRange = [0.2, 0.8],
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const enterStart = progressRange[0];
  const enterSpan = Math.max(progressRange[1] - progressRange[0], EPSILON);
  const exitStart = Math.max(0, 1 - enterSpan);

  return (
    <motion.p
      ref={ref}
      className={`${styles.paragraph} ${className || ""}`.trim()}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className={styles.wordWrap}>
          <ScrollFocusWord
            enterStart={enterStart}
            exitStart={exitStart}
            index={index}
            scrollProgress={scrollYProgress}
            text={word}
          />
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.p>
  );
};

export default ScrollFocusParagraph;
