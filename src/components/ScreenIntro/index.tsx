import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

import styles from "../SwipeCardStack/styles.module.css";
import innerStyles from "./styles.module.css";

type Props = {
  tag: string;
  title: string;
  text: string;
  onClick: () => void;
};

const IntroScreen: React.FC<PropsWithChildren<Props>> = ({
  tag,
  title,
  text,
  onClick,
}) => {
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
      <span className={innerStyles.chip}>{tag}</span>

      <div className="col gap-xs">
        <h3>{title}</h3>
        <p className="font-size-s">{text}</p>
      </div>

      <button onClick={onClick}>Begin</button>
    </motion.div>
  );
};

export default IntroScreen;
