import { motion } from "framer-motion";
import "./style.css";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const RefreshButton: React.FC<Props> = ({ onClick }) => (
  <motion.button
    className="identity-card-refresh"
    style={{ rotate: -15 }}
    whileHover={{ rotate: 0 }}
    whileTap={{ rotate: 15 }}
    onClick={onClick}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="var(--on-surface)"
      strokeWidth="1.5px"
      vectorEffect="non-scaling-stroke"
    >
      <path d="M19 12.0625C19 15.894 15.866 19 12 19C8.13398 19 5.03434 15.9111 4.99998 12.0625C4.9653 8.17936 8.13398 5 12 5L18.4201 5.125M14.3333 0.5L18.01 4.14389C18.2834 4.41482 18.4201 4.76991 18.4201 5.125M14.3333 9.75L18.01 6.10611C18.2834 5.83518 18.4201 5.48009 18.4201 5.125"></path>
    </svg>
  </motion.button>
);

export default RefreshButton;
