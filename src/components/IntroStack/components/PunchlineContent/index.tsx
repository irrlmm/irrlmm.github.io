import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

type Props = {
  index?: number;
  card: UI.Card.Facts;
};

function getRandomIndex<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length);
}

const PunchlineContent: React.FC<Props> = ({ index, card }) => {
  const [randomIndex, setRandomIndex] = useState(getRandomIndex(card.lines));
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setRandomIndex(getRandomIndex(card.lines));
    }
  }, [index]);

  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setRandomIndex((prevIndex) => {
          let nextIndex = getRandomIndex(card.lines);
          while (prevIndex === nextIndex) {
            nextIndex = getRandomIndex(card.lines);
          }
          return nextIndex;
        });
        setIsRefreshing(false);
      }, 750);
    }
  }, [isRefreshing]);

  const refreshWisdom = () => {
    setIsRefreshing(true);
  };

  const words = card.lines[randomIndex].split(" ");

  return (
    <div className={styles.card}>
      <h3>{card.title}</h3>

      <p className={styles.text}>
        {isRefreshing && (
          <span style={{ display: "block" }}>
            {"> "}
            <span className="color-secondary">wisdom --next</span>
          </span>
        )}

        {"> "}

        {index === 0 && !isRefreshing && (
          <motion.span
            key={randomIndex}
            variants={{
              hidden: {},
              shown: {
                transition: { delayChildren: 0.33, staggerChildren: 0.066 },
              },
            }}
            initial="hidden"
            animate="shown"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, display: "none" },
                  shown: {
                    opacity: 1,
                    display: "inline",
                    transition: { duration: 0.15 },
                  },
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.span>
        )}

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.33,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          _
        </motion.span>
      </p>

      <motion.button
        className={styles.button}
        onClick={refreshWisdom}
        whileTap={{ scale: 0.98 }}
      >
        Next
      </motion.button>
    </div>
  );
};

export default PunchlineContent;
