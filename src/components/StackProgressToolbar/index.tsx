import { motion } from "framer-motion";

import ProgressBar, { type ProgressBarProps } from "../AnimatedProgressBar";

import styles from "./styles.module.css";

type Props = {
  bars: ProgressBarProps[];
  className?: string;
  forwardButtonProps?: any;
  refreshButtonProps?: any;
};

const StackProgressToolbar: React.FC<Props> = ({ bars, className }) => {
  return (
    <motion.div
      className={`${styles.toolbar} ${className || undefined}`}
      variants={{
        hidden: { opacity: 0 },
        shown: { opacity: 1, transition: { staggerChildren: 0.15 } },
      }}
    >
      {bars.map((bar, i) => (
        <ProgressBar key={i} {...bar} />
      ))}
    </motion.div>
  );
};

export default StackProgressToolbar;
