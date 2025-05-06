import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import styles from "./styles.module.css";

const Belt = ({ text }: { text: string }) => {
  const TRANSITION_SPRING = { bounce: 0.025 };

  const repeatArray = Array(10).fill(text);

  const target = useRef(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const velocity = useVelocity(scrollYProgress);

  const x = useTransform(scrollYProgress, [0, 1], ["0", `-100%`]);
  const skewX = useTransform(velocity, [-0.33, 0.33], [15, -15]);

  const xSmoothed = useSpring(x, TRANSITION_SPRING);
  const skewXSmoothed = useSpring(skewX, TRANSITION_SPRING);

  return (
    <motion.div ref={target} role="separator" className={styles.wrapper}>
      <motion.div
        className="row gap-xl padding-s"
        style={{ x: xSmoothed, skewX: skewXSmoothed }}
      >
        {repeatArray.map((line, i) => (
          <span key={`line-${i}`}>{line}</span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Belt;
