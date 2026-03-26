import { motion, type TargetAndTransition } from "framer-motion";
import type { SvgName } from "../Svg";
import Svg from "../Svg";
import styles from "./styles.module.css";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: SvgName;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
};

const MotionSvg = motion.create(Svg);

const RefreshButton: React.FC<Props> = ({
  onClick,
  icon,
  whileHover = {},
  whileTap = {},
}) => (
  <motion.button
    className={styles.toolbarButton}
    variants={{
      hidden: { opacity: 0, filter: "blur(0.5rem)" },
      shown: { opacity: 1, filter: "blur(0rem)" },
    }}
    initial="hidden"
    animate="shown"
    exit="hidden"
    whileHover="hover"
    whileTap="tap"
    onClick={onClick}
  >
    <MotionSvg
      name={icon}
      size="2rem"
      variants={{
        hover: whileHover,
        tap: whileTap,
      }}
      transition={{ duration: 0.15, bounce: 0 }}
    />
  </motion.button>
);

export default RefreshButton;
