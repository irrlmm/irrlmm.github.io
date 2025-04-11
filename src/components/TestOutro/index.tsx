import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

import styles from "../CardStack/styles.module.css";
import innerStyles from "./styles.module.css";

const ScreenOutro: React.FC<PropsWithChildren> = ({ children }) => {
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
    >
      {children}
    </motion.div>
  );
};

export default ScreenOutro;
