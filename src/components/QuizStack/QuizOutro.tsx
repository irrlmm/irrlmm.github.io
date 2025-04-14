import { motion } from "framer-motion";

import styles from "../CardStack/styles.module.css";
import introStyles from "../ScreenIntro/styles.module.css";
import innerStyles from "./styles.module.css";
import Svg from "../Svg";
import { SVG_KEY } from "../../consts/svg";

type Props = {
  outro: any;
  rightCount: number;
  questions: any[];
};

const ScreenOutro: React.FC<Props> = ({ outro, questions, rightCount }) => {
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

  const allPositiveCount = questions.filter((q) =>
    q.options.some((o: any) => o.response.type === "positive")
  ).length;

  const completionPercent = Math.round((rightCount / allPositiveCount) * 100);

  return (
    <motion.div
      className={`${styles.container} ${introStyles.screen}`}
      variants={variants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      <span className={innerStyles.resultText}>
        {
          outro[rightCount === questions.length ? "allCorrect" : "someCorrect"]
            .title
        }
      </span>

      <span className={innerStyles.score}>
        {completionPercent}% / {rightCount}{" "}
        <Svg d={SVG_KEY} strokeWidth={3} size="var(--unit-l)" />
      </span>

      <span className={innerStyles.resultText}>
        {
          outro[rightCount === questions.length ? "allCorrect" : "someCorrect"]
            .text
        }
      </span>
    </motion.div>
  );
};

export default ScreenOutro;
