import { motion } from "framer-motion";

import { coverVariants } from ".";
import { SVG_REFRESH } from "../../consts/svg";
import RefreshButton from "../RefreshButton";
import styles from "./styles.module.css";

type Props = {
  points: number;
  winScore: UI.Quiz.Game["winScore"];
  outro: UI.Quiz.Game["outro"];
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
        icon={SVG_REFRESH}
        whileHover={{ rotate: 15 }}
        whileTap={{ rotate: 30 }}
        onClick={() => {}}
      />
    </motion.div>
  );
};

export default QuizOutro;
