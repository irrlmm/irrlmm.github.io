import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import styles from "./styles.module.css";

type Props = { src: string };

const JumboProjectCard: React.FC<Props> = ({ src }) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const velocity = useVelocity(scrollYProgress);

  const velAnim = useSpring(velocity, { bounce: 0.5 });

  const rotateX = useTransform(velAnim, [-10, 0, 10], [15, 0, -15]);

  const opacity = useTransform(rotateX, [15, 0, -15], [1, 0, 1]);
  const translateY = useTransform(rotateX, [15, 0, -15], [-256, 0, 256]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const scaleAnimated = useSpring(scale, { bounce: 0.2 });

  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [6, 0, 0, 6]);
  const blurRounded = useTransform(blur, (v) => v.toFixed(2));

  const filter = useTransform(blurRounded, (v) => `blur(${v}px)`);

  return (
    <div className={styles.wrapper}>
      <motion.div
        ref={target}
        className={styles.card}
        style={{
          rotateX,
          scale: scaleAnimated,
          filter,
        }}
      >
        <img
          className={styles.image}
          src={src}
          loading="lazy"
          decoding="async"
          alt=""
        />

        <motion.div
          style={{ translateY, opacity }}
          className={styles.overlay}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default JumboProjectCard;
