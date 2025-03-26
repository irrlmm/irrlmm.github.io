import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

import { SVG_CHECK } from "../../consts/svg";

import styles from "./styles.module.css";

type ChecklistItemProps = {
  title: string;
  description: string;
};

const AnimatedCheckItem: React.FC<ChecklistItemProps> = ({
  title,
  description,
}) => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "center"],
  });

  const iconStrokeDashoffset = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.8],
    [33.112, 33.112 * 1.75, 33.112 * 2]
  );

  return (
    <div ref={target} className={styles.tile}>
      <div className={styles.checkboxWrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="none"
        >
          <motion.path
            d={SVG_CHECK}
            stroke="var(--accent)"
            style={{ strokeDashoffset: iconStrokeDashoffset }}
            strokeDasharray={33.112}
            strokeWidth={2}
          ></motion.path>
        </svg>
      </div>

      <div className="flex-1 col gap-4">
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default AnimatedCheckItem;
