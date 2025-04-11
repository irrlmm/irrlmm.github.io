import { motion } from "framer-motion";

import styles from "../CardStack/styles.module.css";
import innerStyles from "./styles.module.css";
import type { TEST_SCHEMA } from "../../consts/tests";
import ProgressBar from "../AnimatedProgressBar";

type Props = {
  outro: TEST_SCHEMA["outro"];
  types: TEST_SCHEMA["types"];
  typeStructure: TEST_SCHEMA["typeStructure"];
  results: { [k: string]: number };
  questions: TEST_SCHEMA["questions"];
};

const TestOutro: React.FC<Props> = ({ outro, types, results, questions }) => {
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

  return (
    <motion.div
      className={`${styles.container} ${innerStyles.screen}`}
      variants={variants}
      initial="hidden"
      animate="shown"
      exit="hidden"
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="row gap-s"
        variants={{
          hidden: {},
          shown: {
            transition: { delayChildren: 0.5, staggerChildren: 0.1 },
          },
        }}
      >
        {types.map((t) => (
          <ProgressBar
            progress={results[t.id] / questions.length}
            text={t.id.toUpperCase()}
            progressType="block"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TestOutro;
