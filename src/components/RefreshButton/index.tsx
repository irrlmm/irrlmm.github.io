import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Svg from "../Svg";
import { SVG_REFRESH } from "../../consts/svg";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isEnabled?: boolean;
};

const RefreshButton: React.FC<Props> = ({ onClick, isEnabled = true }) => (
  <motion.button
    className={styles.refresh}
    onClick={onClick}
    initial={{ opacity: isEnabled ? 1 : 0 }}
    animate={{
      opacity: isEnabled ? 1 : 0,
    }}
  >
    <motion.div
      className={styles.content}
      whileHover={{ rotate: 15 }}
      whileTap={{ rotate: 30 }}
    >
      <Svg d={SVG_REFRESH} />
    </motion.div>
  </motion.button>
);

export default RefreshButton;
