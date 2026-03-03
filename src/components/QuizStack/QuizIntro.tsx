import type { FC } from "react";
import { motion } from "framer-motion";

import styles from "./styles.module.css";
import { coverVariants } from ".";

type Props = {
  tag: string;
  title: string;
  text: string;
  onClick: () => void;
};

const QuizIntro: FC<Props> = ({ tag, title, text, onClick }) => {
  return (
    <motion.div
      className={`${styles.container} ${styles.screen}`}
      variants={coverVariants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      <span className="eyebrow overline-s">{tag}</span>

      <div className="col gap-xs">
        <h3>{title}</h3>
        <p className="font-size-s">{text}</p>
      </div>

      <button onClick={onClick}>Begin</button>
    </motion.div>
  );
};

export default QuizIntro;
