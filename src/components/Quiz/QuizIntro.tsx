import { motion } from "framer-motion";
import type { FC } from "react";

import { coverVariants } from ".";
import Button from "../Button";
import styles from "../Quiz/styles.module.css";

type Props = {
  title: string;
  text: string;
  onClick: () => void;
};

const QuizIntro: FC<Props> = ({ title, text, onClick }) => (
  <motion.div
    className={styles.cover}
    variants={coverVariants}
    initial="hidden"
    animate="shown"
    exit="hidden"
  >
    <motion.span className="kicker overline text-m">Quiz</motion.span>

    <motion.h3 className="overline text-xl">{title}</motion.h3>

    <motion.p className="overline text-l">{text}</motion.p>

    <Button size="m" label="Begin" onClick={onClick} />
  </motion.div>
);

export default QuizIntro;
