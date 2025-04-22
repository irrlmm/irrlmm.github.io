import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

type Props = {
  index?: number;
  card: UI.Card.Facts;
};

const PunchlineContent: React.FC<Props> = ({ index, card }) => {
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * card.lines.length)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setRandomIndex(Math.floor(Math.random() * card.lines.length));
    }
  }, [index]);

  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setRandomIndex((prevIndex) => {
          let nextIndex = Math.floor(Math.random() * card.lines.length);
          while (prevIndex === nextIndex) {
            nextIndex = Math.floor(Math.random() * card.lines.length);
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
        Another
      </motion.button>
    </div>
  );
};

export default PunchlineContent;
