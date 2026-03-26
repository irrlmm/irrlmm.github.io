import { motion } from "framer-motion";
import type { CardGame, CardGameEnding } from "../../types/content";

import { coverVariants } from ".";
import RefreshButton from "../RefreshButton";
import styles from "./styles.module.css";

type Props = {
  ending: CardGameEnding;
  title: CardGame["outro"]["title"];
  onRestart: () => void;
};

const GameOutro: React.FC<Props> = ({ ending, title, onRestart }) => {
  return (
    <motion.div
      className={styles.cover}
      variants={coverVariants}
      initial="hidden"
      animate="shown"
      exit="hidden"
    >
      <span className="kicker overline text-l">{title}</span>

      <p className="overline text-xl">{ending.title}</p>

      <p className="overline text-l">{ending.text}</p>

      <RefreshButton
        icon="refresh"
        whileHover={{ rotate: 15 }}
        whileTap={{ rotate: 30 }}
        onClick={onRestart}
      />
    </motion.div>
  );
};

export default GameOutro;
