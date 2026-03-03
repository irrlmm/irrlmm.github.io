import { motion } from "framer-motion";

import Svg from "../Svg";

import { SVG_KEY } from "../../consts/svg";

import styles from "./styles.module.css";
import { coverVariants } from ".";

type Props = {
  points: number;
  winScore: UI.Quiz.Game["winScore"];
  outro: UI.Quiz.Game["outro"];
};

const ScreenOutro: React.FC<Props> = ({ points, winScore, outro }) => {
  const completionPercent = Math.round((points / winScore) * 100);

  return (
    <motion.div
      className={`${styles.container} ${styles.screen}`}
      variants={coverVariants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      <span className={styles.resultText}>Session ended</span>
      <span className={styles.score}>
        {completionPercent < 0 ? 0 : completionPercent}% /{" "}
        {points < 0 ? 0 : points}{" "}
        <Svg d={SVG_KEY} strokeWidth={3} size="var(--unit-l)" />
      </span>

      <span className={styles.resultText}>
        {outro[completionPercent === 100 ? "winnerText" : "loserText"]}
      </span>
    </motion.div>
  );
};

export default ScreenOutro;
