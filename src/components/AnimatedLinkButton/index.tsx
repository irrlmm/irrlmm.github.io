import { motion } from "framer-motion";

import Svg from "../Svg";

import { SVG_ARROW } from "../../consts/svg";

import styles from "./styles.module.css";

const SvgAnimated = motion.create(Svg);

type Props = {
  label: string;
  href: string;
  external?: boolean;
};

const AnimatedLinkButton: React.FC<Props> = ({ label, href, external }) => {
  return (
    <motion.a
      className={styles.button}
      href={href}
      whileHover="hover"
      whileTap="pressed"
      variants={{
        pressed: {
          scale: 0.98,
        },
      }}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <span>{label}</span>

      <SvgAnimated
        variants={{
          hover: { x: 4, y: -4 },
          pressed: { x: 4, y: -4 },
        }}
        transition={{ duration: 0.125, bounce: 0 }}
        d={SVG_ARROW}
      />
    </motion.a>
  );
};

export default AnimatedLinkButton;
