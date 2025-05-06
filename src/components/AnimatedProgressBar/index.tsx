import { motion } from "framer-motion";

import Svg from "../Svg";

import AnimatedCircle from "../AnimatedCircle";

export type ProgressBarProps = {
  progress?: number; // 0...1
  icon?: string;
  text: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = null,
  icon = null,
  text,
}) => (
  <motion.div
    className="row gap-s align-center"
    variants={{
      hidden: { opacity: 0 },
      shown: { opacity: 1, transition: { delayChildren: 0.33 } },
    }}
  >
    {progress !== null && <AnimatedCircle progress={progress} />}

    {icon !== null && <Svg d={icon} size="var(--unit-l)" />}

    <span className="font-size-s">{text}</span>
  </motion.div>
);

export default ProgressBar;
