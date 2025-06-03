import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

type Props = {
  index?: number;
  card: UI.Card.Facts;
};

const PunchlineContent: React.FC<Props> = ({ card }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setNextLineIndex();
        setIsRefreshing(false);
      }, 100);
    }
  }, [isRefreshing]);

  const setNextLineIndex = () => {
    setCurrentLineIndex((i) => {
      if (i !== card.lines.length - 1) {
        return i + 1;
      }
      return 0;
    });
  };

  const refreshWisdom = () => {
    setIsRefreshing(true);
  };

  const words = card.lines[currentLineIndex].split(" ");

  return (
    <div className={styles.card}>
      {/* <h3>{card.title}</h3> */}

      <p className={styles.text}>
        {isRefreshing && (
          <span style={{ display: "block" }}>
            {"> "}
            <span className="color-secondary">--next</span>
          </span>
        )}

        {"> "}

        {!isRefreshing && (
          <motion.span
            key={currentLineIndex}
            variants={{
              hidden: {},
              shown: {
                transition: { delayChildren: 0.1, staggerChildren: 0.04 },
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
                    transition: { duration: 0.1 },
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
