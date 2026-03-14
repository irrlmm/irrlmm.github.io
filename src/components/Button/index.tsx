import { motion } from "framer-motion";
import styles from "./styles.module.css";

type Props = {
  size?: "s" | "m" | "l" | "xl" | "2xl" | "3xl";
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<Props> = ({ size = "s", label, onClick }) => {
  return (
    <motion.button
      className={`${styles.button} overline text-${size}`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default Button;
