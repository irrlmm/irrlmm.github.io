import { motion, type TargetAndTransition } from "framer-motion";
import styles from "./styles.module.css";
import Svg from "../Svg";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: string;
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
      hidden: { opacity: 0, filter: "blur(8.0px)" },
      shown: { opacity: 1, filter: "blur(0.0px)" },
    }}
    initial="hidden"
    animate="shown"
    exit="hidden"
    whileHover="hover"
    whileTap="tap"
    onClick={onClick}
  >
    <MotionSvg
      d={icon}
      size={24}
      variants={{
        hover: whileHover,
        tap: whileTap,
      }}
    />
  </motion.button>
);

export default RefreshButton;
