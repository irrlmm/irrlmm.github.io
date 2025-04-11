import type { TEST_QUESTION } from "../../consts/tests";

import { motion } from "framer-motion";

import styles from "./styles.module.css";

type Props = {
  card: TEST_QUESTION;
  onClick?: (id: string) => void;
};

const TestCardItem: React.FC<Props> = ({ card, onClick }) => {
  return (
    <div className={styles.card}>
      <h4>{card.title}</h4>

      <div className="col gap-xs">
        {card.answers.map((a) => (
          <motion.button
            key={a.type}
            className={styles.answerButton}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
            onClick={() => {
              if (onClick) {
                onClick(a.type);
              }
            }}
          >
            {a.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TestCardItem;
