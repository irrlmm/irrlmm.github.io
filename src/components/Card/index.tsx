import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

import styles from "./styles.module.css";

type Props = {
  src?: string;
  index: number;
  zIndex: number;
  rotation: number;
  content: React.JSX.Element;
};

const Card: React.FC<Props> = ({ src, rotation, content: Content }) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [rotation, rotation * -1]
  );

  const rotateSpring = useSpring(rotate, { bounce: 0.05, visualDuration: 0.2 });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 1.05]
  );

  const scaleSpring = useSpring(scale, { bounce: 0.05, visualDuration: 0.2 });

  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, 8]);

  const blurSpring = useSpring(blur, {
    bounce: 0,
    visualDuration: 0.2,
  });

  const filter = useMotionTemplate`blur(${blurSpring}px)`;

  return (
    <motion.div
      ref={target}
      className={styles.card}
      variants={{
        hidden: { opacity: 0, y: 512 },
        shown: {
          opacity: 1,
          y: 0,
        },
      }}
      style={{
        filter,
        rotate: rotateSpring,
        scale: scaleSpring,
      }}
      transition={{ type: "spring", visualDuration: 0.33, bounce: 0.2 }}
    >
      {src && (
        <img
          className={styles.image}
          src={src}
          loading="lazy"
          decoding="async"
          alt=""
        />
      )}
      {Content}
    </motion.div>
  );
};

export default Card;
