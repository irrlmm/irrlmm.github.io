import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import styles from "./styles.module.css";

type Props = { src: string; chip?: string; logo?: string; className?: string };

const JumboProjectCard: React.FC<Props> = ({ src, chip, logo, className }) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const velocity = useVelocity(scrollYProgress);

  const velAnim = useSpring(velocity, { bounce: 0.66, stiffness: 350 });

  const rotateXCard = useTransform(
    velAnim,
    [-10, -5, 0, 5, 10],
    [15, 10, 0, -10, -15]
  );
  const rotateXLogo = useTransform(velAnim, [-10, 0, 10], [60, 0, -60]);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );
  const scaleAnimated = useSpring(scale, { bounce: 0.2 });

  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [4, 0, 0, 4]);
  const blurRounded = useTransform(blur, (v) => v.toFixed(2));

  const filter = useTransform(blurRounded, (v) => `blur(${v}px)`);

  // overlay effects
  const overlayLightOpacity = useTransform(
    rotateXCard,
    [15, 8, 0, -8, -15],
    [1, 0.33, 0, 0.15, 0]
  );
  const overlayLightTranslateY = useTransform(
    rotateXCard,
    [15, 0, -15],
    [-100, 0, 100]
  );
  const overlayTranslateY = useTransform(
    overlayLightTranslateY,
    (v) => `${v}%`
  );

  const overlayDarkOpacity = useTransform(rotateXCard, [0, -45], [0, 1]);

  return (
    <motion.div
      className={`${styles.wrapper} ${className}`}
      ref={target}
      style={{ scale: scaleAnimated, filter }}
    >
      <div className={styles["card-wrapper"]}>
        <motion.div
          className={styles.card}
          style={{
            rotateX: rotateXCard,
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
            className={styles["overlay-light"]}
            style={{
              translateY: overlayTranslateY,
              opacity: overlayLightOpacity,
            }}
          ></motion.div>

          <motion.div
            className={styles["overlay-dark"]}
            style={{
              opacity: overlayDarkOpacity,
            }}
          ></motion.div>
        </motion.div>

        {logo && (
          <motion.div
            className={styles.logo}
            style={{ translateZ: 64, rotateX: rotateXLogo }}
          >
            <img src={logo} alt="Project logo" />

            <motion.div
              className={styles["overlay-light"]}
              style={{
                translateY: overlayTranslateY,
                opacity: overlayLightOpacity,
              }}
            ></motion.div>

            <motion.div
              className={styles["overlay-dark"]}
              style={{
                opacity: overlayDarkOpacity,
              }}
            ></motion.div>
          </motion.div>
        )}
      </div>

      {chip && <span className={styles.caption}>{chip}</span>}
    </motion.div>
  );
};

export default JumboProjectCard;
