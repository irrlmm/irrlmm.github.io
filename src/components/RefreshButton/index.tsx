import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Svg from "../Svg";
import { SVG_REFRESH } from "../../consts/svg";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const RefreshButton: React.FC<Props> = ({ onClick }) => (
  <motion.button className={styles.refresh} onClick={onClick}>
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
