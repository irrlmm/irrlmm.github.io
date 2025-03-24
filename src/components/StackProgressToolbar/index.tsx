import { motion } from "framer-motion";
import { SVG_CHECK } from "../../consts/svg";
import RefreshButton from "../RefreshButton";
import styles from "./styles.module.css";

type Props = {
  hasViewedAll: boolean;
  currentStep: number;
  totalSteps: number;
  onClickRefresh: () => void | false;
  enableRefresh?: boolean;
  gems?: number | undefined;
};

const StackProgressToolbar: React.FC<Props> = ({
  hasViewedAll,
  currentStep,
  totalSteps,
  enableRefresh = true,
  gems,
  onClickRefresh,
}) => {
  const CIRCLE_RADIUS = 10;
  const PATH_CIRCLE_LENGTH = 2 * Math.PI * CIRCLE_RADIUS;
  const PATH_CHECK_LENGTH = 33.112;

  return (
    <div
      className={`${styles.toolbar} row gap-16 align-center justify-between`}
    >
      <div className="row gap-16">
        <div className={styles.progress}>
          <div className={styles.iconWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="none"
            >
              <motion.circle
                cx="12"
                cy="12"
                r={CIRCLE_RADIUS}
                stroke="var(--on-surface)"
                animate={{
                  opacity: hasViewedAll ? 0 : 0.2,
                }}
                strokeWidth={1.5}
              ></motion.circle>

              <motion.circle
                cx="12"
                animate={{
                  opacity: hasViewedAll ? 0 : 1,
                  strokeDashoffset:
                    PATH_CIRCLE_LENGTH *
                    ((totalSteps - currentStep) / totalSteps),
                }}
                cy="12"
                r="10"
                style={{ rotate: -90, transformOrigin: "center" }}
                strokeWidth={1.5}
                stroke="var(--on-surface)"
                strokeDasharray={PATH_CIRCLE_LENGTH}
              ></motion.circle>
            </svg>

            {hasViewedAll && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="none"
              >
                <motion.path
                  d={SVG_CHECK}
                  stroke="var(--accent)"
                  animate={{
                    strokeDashoffset: PATH_CHECK_LENGTH * 2,
                  }}
                  strokeDashoffset={PATH_CHECK_LENGTH}
                  strokeDasharray={PATH_CHECK_LENGTH}
                  strokeWidth={2}
                  transition={{ delay: 0.2 }}
                ></motion.path>
              </svg>
            )}
          </div>

          <span className="body-m color-secondary">
            {currentStep} / {totalSteps}
          </span>
        </div>

        {gems && (
          <div className={styles.progress}>
            <span>💎</span>
            <span>{gems}</span>
          </div>
        )}
      </div>

      <RefreshButton onClick={onClickRefresh} isEnabled={enableRefresh} />
    </div>
  );
};

export default StackProgressToolbar;
