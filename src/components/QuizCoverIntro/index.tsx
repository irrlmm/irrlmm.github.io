import type { FC } from "react";
import { motion } from "framer-motion";

import parentStyles from "../QuizStack/styles.module.css";
import styles from "./styles.module.css";
import { coverVariants } from "../QuizStack";

type Props = {
  title: string;
  text: string;
  onClick: () => void;
};

const QuizCoverIntro: FC<Props> = ({ title, text, onClick }) => {
  return (
    <motion.div
      className={`${parentStyles.container} ${styles.cover}`}
      variants={coverVariants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      <span className="eyebrow overline-l">Quiz</span>

      <div className="col gap-xs">
        <h3>{title}</h3>
        <p className="font-size-s">{text}</p>
      </div>

      <button onClick={onClick}>Begin</button>
    </motion.div>
  );
};

export default QuizCoverIntro;
