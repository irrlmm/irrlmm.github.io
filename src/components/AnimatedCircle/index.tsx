import { motion } from "framer-motion";

import { SVG_CHECK } from "../../consts/svg";

import styles from "./styles.module.css";

export type ProgressBarProps = {
  progress: number; // 0...1
};

const AnimatedCircle: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  const CIRCLE_SIZE = 48;
  const ICON_SIZE = 24;
  const STROKE_WIDTH = 2;
  const CIRCLE_RADIUS = CIRCLE_SIZE / 2 - STROKE_WIDTH / 2;
  const CIRCLE_CP = CIRCLE_SIZE / 2;

  const CIRCLE_PATH_LENGTH = 2 * Math.PI * CIRCLE_RADIUS;

  /**
   * pre-calculated on https://codepen.io/gabriellewee/pen/EZPYmw
   */
  const CHECK_PATH_LENGTH = 30.643;

  return (
    <div className={styles.iconWrapper}>
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
          stroke="var(--on-surface-var-2)"
          strokeWidth={STROKE_WIDTH}
        ></motion.circle>

        <motion.circle
          cx={CIRCLE_CP}
          cy={CIRCLE_CP}
          r={CIRCLE_RADIUS}
          stroke="var(--on-surface)"
          strokeWidth={STROKE_WIDTH}
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
        viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}
        fill="none"
        stroke="var(--on-surface)"
      >
        <motion.path
          d={SVG_CHECK}
          variants={{
            hidden: { strokeDashoffset: CHECK_PATH_LENGTH },
            shown: {
              strokeDashoffset: progress === 1 ? 0 : CHECK_PATH_LENGTH,
            },
          }}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CHECK_PATH_LENGTH}
        ></motion.path>
      </svg>
    </div>
  );
};

export default AnimatedCircle;
