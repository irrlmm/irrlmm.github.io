import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { useRef, type PropsWithChildren } from "react";

import styles from "./styles.module.css";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const velocity = useVelocity(scrollYProgress);

  const rotateX = useTransform(velocity, [-5, 5], [45, -45], { clamp: true });
  const rotateXSpring = useSpring(rotateX, {
    bounce: 0.5,
    visualDuration: 0.2,
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.9, 0.95, 0.95, 0.9]
  );
  const scaleSpring = useSpring(scale, {
    bounce: 0.33,
    visualDuration: 0.2,
  });

  const blur = useTransform(scaleSpring, [0.9, 0.95], [8, 0]);

  const filter = useMotionTemplate`blur(${blur}px)`;

  const overlayY = useTransform(
    rotateXSpring,
    [-30, 0, 30],
    ["-100%", "0%", "100%"]
  );

  const overlayOpacity = useTransform(
    rotateXSpring,
    [-30, -15, 0, 15, 30],
    [1, 0.15, 0, 0.15, 1]
  );

  return (
    <motion.div
      ref={target}
      className={styles.card}
      variants={{
        hidden: { opacity: 0, y: 64, translateZ: -200, rotateX: -33 },
        shown: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          translateZ: 0,
          transition: { type: "spring", bounce: 0.4 },
        },
      }}
      style={{
        filter,
        rotateX: rotateXSpring,
        scale: scaleSpring,
      }}
      transition={{ type: "spring", visualDuration: 0.33, bounce: 0.2 }}
    >
      {children}

      <motion.div
        className={styles.overlay}
        style={{ y: overlayY, opacity: overlayOpacity }}
      />
    </motion.div>
  );
};

export default Card;
