import { useRef } from "react";
import {
  delay,
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

  const x = useTransform(scrollYProgress, [0, 1], ["0", `-300%`]);
  const skewX = useTransform(velocity, [-0.33, 0.33], [15, -15]);

  const xSmoothed = useSpring(x, TRANSITION_SPRING);
  const skewXSmoothed = useSpring(skewX, TRANSITION_SPRING);

  return (
    <motion.div
      role="separator"
      className={styles.wrapper}
      variants={{
        hidden: { opacity: 0, scaleY: 0 },
        shown: {
          opacity: 1,
          scaleY: 1,
          transition: { delay: 0.33, bounce: 0.1, duration: 0.15 },
        },
      }}
      initial="hidden"
      animate="shown"
    >
      <motion.div
        className="row gap-xl padding-s"
        style={{ x: xSmoothed, skewX: skewXSmoothed }}
      >
        {repeatArray.map((line) => (
          <span>{line}</span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Belt;
