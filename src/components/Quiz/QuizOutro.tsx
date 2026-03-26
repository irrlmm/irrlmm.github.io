import { motion } from "framer-motion";
import type { QuizGame } from "../../types/content";

import { coverVariants } from ".";
import RefreshButton from "../RefreshButton";
import styles from "./styles.module.css";

type Props = {
  points: number;
  winScore: QuizGame["winScore"];
  outro: QuizGame["outro"];
};

const QuizOutro: React.FC<Props> = ({ points, winScore, outro }) => {
  const completionPercent = Math.round((points / winScore) * 100);

  return (
    <motion.div
      className={styles.cover}
      variants={coverVariants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      <span className="kicker overline text-l">Session ended</span>

      <p className="overline text-l">
        {outro[completionPercent === 100 ? "winnerText" : "loserText"]}
      </p>

      <RefreshButton
        icon="refresh"
        whileHover={{ rotate: 15 }}
        whileTap={{ rotate: 30 }}
        onClick={() => {}}
      />
    </motion.div>
  );
};

export default QuizOutro;
