import { motion } from "framer-motion";

import type { SvgName } from "../Svg";
import AnimatedCircle from "../AnimatedCircle";
import Svg from "../Svg";

export type ProgressBarProps = {
  progress?: number; // 0...1
  icon?: SvgName;
  text: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  icon,
  text,
}) => (
  <motion.div
    className="row gap-2 align-center"
    variants={{
      hidden: { opacity: 0 },
      shown: {
        opacity: 1,
        transition: { delayChildren: 0.2, staggerChildren: 0.05 },
      },
    }}
  >
    {typeof progress === "number" && <AnimatedCircle progress={progress} />}

    {icon && <Svg name={icon} size="1.5rem" stroke="var(--on-surface)" />}

    <span className="overline text-m">{text}</span>
  </motion.div>
);

export default ProgressBar;
