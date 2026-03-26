import { motion } from "framer-motion";
import Svg from "../Svg";
import styles from "./styles.module.css";

const MotionSvg = motion(Svg);

const BackButton = () => {
  const onClick = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/");
  };

  return (
    <motion.button
      aria-label="Go back"
      className={styles.button}
      onClick={onClick}
      type="button"
      whileHover="hover"
      whileTap="tap"
    >
      <MotionSvg name="arrowBack" />
    </motion.button>
  );
};

export default BackButton;
