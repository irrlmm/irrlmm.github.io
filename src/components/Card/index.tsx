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

  const rotateX = useTransform(velocity, [-4, -0.5, 0.5, 4], [33, 5, -5, -33]);
  const rotateXSpring = useSpring(rotateX, {
    bounce: 0.66,
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.33, 0.5, 0.66, 1],
    [0.9, 0.98, 1, 0.98, 0.9]
  );
  const scaleSpring = useSpring(scale, { bounce: 0.075, visualDuration: 0.2 });

  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [16, 0, 0, 16]);
  const blurSpring = useSpring(blur, {
    bounce: 0,
    visualDuration: 0.2,
  });

  const filter = useMotionTemplate`blur(${blurSpring}px)`;

  const overlayY = useTransform(
    rotateXSpring,
    [-15, 0, 15],
    ["-100", "0%", "100%"]
  );

  const overlayOpacity = useTransform(rotateXSpring, [-15, 0, 15], [1, 0, 1]);

  return (
    <motion.div
      ref={target}
      className={styles.card}
      variants={{
        hidden: { opacity: 0, y: 64, rotateX: -15 },
        shown: {
          opacity: 1,
          y: 0,
          rotateX: 0,
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
