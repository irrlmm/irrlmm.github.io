import { motion } from "framer-motion";

import ProgressBar, { type ProgressBarProps } from "../AnimatedProgressBar";

import styles from "./styles.module.css";

type Props = {
  bars: ProgressBarProps[];
  forwardButtonProps?: any;
  refreshButtonProps?: any;
};

const StackProgressToolbar: React.FC<Props> = ({
  bars,
  forwardButtonProps,
  refreshButtonProps,
}) => {
  return (
    <motion.div
      className={styles.toolbar}
      variants={{
        hidden: { opacity: 0 },
        shown: { opacity: 1 },
      }}
    >
      {bars.map((bar, i) => (
        <ProgressBar key={i} {...bar} />
      ))}

      {/* <AnimatePresence mode="wait">
        {refreshButtonProps && refreshButtonProps.isShown && (
          <ToolbarButton
            key="refresh"
            onClick={refreshButtonProps.onClick}
            icon={SVG_REFRESH}
            whileHover={{ rotate: 22.5 }}
            whileTap={{ rotate: 45 }}
          />
        )}

        {forwardButtonProps && forwardButtonProps.isShown && (
          <ToolbarButton
            key="fwd"
            onClick={forwardButtonProps.onClick}
            icon={SVG_FWD}
            whileHover={{ x: 3 }}
            whileTap={{ x: 6 }}
          />
        )}
      </AnimatePresence> */}
    </motion.div>
  );
};

export default StackProgressToolbar;
