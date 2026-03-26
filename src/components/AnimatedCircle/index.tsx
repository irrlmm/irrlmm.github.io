import { motion } from "framer-motion";

import { SVGS } from "../Svg";

import styles from "./styles.module.css";

export type ProgressBarProps = {
  progress: number; // 0...1
};

const AnimatedCircle: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  const CIRCLE_SIZE = 32;
  const ICON_SIZE = 16;
  const CIRCLE_STROKE_WIDTH = 1.5;
  const ICON_STROKE_WIDTH = 1.5;
  const CIRCLE_RADIUS = CIRCLE_SIZE / 2 - CIRCLE_STROKE_WIDTH / 2;
  const CIRCLE_CP = CIRCLE_SIZE / 2;

  const CIRCLE_PATH_LENGTH = 2 * Math.PI * CIRCLE_RADIUS;

  /**
   * pre-calculated on https://codepen.io/gabriellewee/pen/EZPYmw
   */
  const CHECK_PATH_LENGTH = 30.643;

  return (
    <motion.div
      className={styles.iconWrapper}
      variants={{
        hidden: {},
        shown: { transition: { delayChildren: 0.15 } },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={CIRCLE_SIZE}
        height={CIRCLE_SIZE}
        viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
        fill="none"
      >
        <motion.circle
          cx={CIRCLE_CP}
          cy={CIRCLE_CP}
          r={CIRCLE_RADIUS}
          stroke="var(--primary)"
          opacity={0.2}
          strokeWidth={CIRCLE_STROKE_WIDTH}
        ></motion.circle>

        <motion.circle
          cx={CIRCLE_CP}
          cy={CIRCLE_CP}
          r={CIRCLE_RADIUS}
          stroke="var(--primary)"
          strokeWidth={CIRCLE_STROKE_WIDTH}
          strokeDasharray={CIRCLE_PATH_LENGTH}
          variants={{
            hidden: { strokeDashoffset: CIRCLE_PATH_LENGTH },
            shown: {
              strokeDashoffset:
                CIRCLE_PATH_LENGTH - CIRCLE_PATH_LENGTH * progress,
            },
          }}
        ></motion.circle>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox={`0 0 24 24`}
        fill="none"
        stroke="var(--primary)"
      >
        <motion.path
          d={SVGS.check}
          variants={{
            hidden: { strokeDashoffset: CHECK_PATH_LENGTH },
            shown: {
              strokeDashoffset: progress === 1 ? 0 : CHECK_PATH_LENGTH,
            },
          }}
          strokeWidth={ICON_STROKE_WIDTH}
          strokeDasharray={CHECK_PATH_LENGTH}
          vectorEffect="non-scaling-stroke"
        ></motion.path>
      </svg>
    </motion.div>
  );
};

export default AnimatedCircle;
