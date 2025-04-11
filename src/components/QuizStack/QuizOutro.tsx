import { motion } from "framer-motion";

import styles from "../CardStack/styles.module.css";
import introStyles from "../ScreenIntro/styles.module.css";
import innerStyles from "../ScreenIntro/styles.module.css";

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

      <span className={innerStyles.score}>{completionPercent}%</span>

      <div className="col gap-16">
        <span className={innerStyles.resultText}>
          You earned {rightCount} 💎
        </span>

        <span className={innerStyles.resultText}>
          {
            outro[
              rightCount === questions.length ? "allCorrect" : "someCorrect"
            ].text
          }
          <br />
        </span>
      </div>
    </motion.div>
  );
};

export default ScreenOutro;
