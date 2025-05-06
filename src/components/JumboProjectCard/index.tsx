import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import styles from "./styles.module.css";

type Props = { stackIndex: number; index: number; src: string };

const JumboProjectCard: React.FC<Props> = ({ stackIndex, index, src }) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.495, 0.5],
    [1, 1, 1 - 0.0075 * stackIndex]
  );
  const scaleAnimated = useSpring(scale, { bounce: 0 });

  return (
    <motion.div
      ref={target}
      className={styles.card}
      style={{
        y: index * 8,
        scale: scaleAnimated,
      }}
    >
      <img
        className={styles.image}
        src={src}
        loading="lazy"
        decoding="async"
        alt=""
      />
    </motion.div>
  );
};

export default JumboProjectCard;
