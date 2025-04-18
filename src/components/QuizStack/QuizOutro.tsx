import { motion } from "framer-motion";

import Svg from "../Svg";

import { SVG_KEY } from "../../consts/svg";

import styles from "../CardStack/styles.module.css";
import introStyles from "../ScreenIntro/styles.module.css";
import innerStyles from "./styles.module.css";
import type { Quiz } from "../../consts/quizzes";

type Props = {
  points: number;
  winScore: Quiz["winScore"];
  outro: Quiz["outro"];
};

const ScreenOutro: React.FC<Props> = ({ points, winScore, outro }) => {
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: "blur(8px)",
    },
    shown: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  const completionPercent = Math.round((points / winScore) * 100);

  return (
    <motion.div
      className={`${styles.container} ${introStyles.screen}`}
      variants={variants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      <span className={innerStyles.resultText}>Session ended</span>
      <span className={innerStyles.score}>
        {completionPercent < 0 ? 0 : completionPercent}% /{" "}
        {points < 0 ? 0 : points}{" "}
        <Svg d={SVG_KEY} strokeWidth={3} size="var(--unit-l)" />
      </span>

      <span className={innerStyles.resultText}>
        {outro[completionPercent === 100 ? "winnerText" : "loserText"]}
      </span>
    </motion.div>
  );
};

export default ScreenOutro;
