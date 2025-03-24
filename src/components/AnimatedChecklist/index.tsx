import styles from "./styles.module.css";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SVG_CHECK } from "../../consts/svg";

type ChecklistItemProps = {
  title: string;
  description: string;
};

type Props = {
  list: ChecklistItemProps[];
};

const AnimatedChecklistItem: React.FC<ChecklistItemProps> = ({
  title,
  description,
}) => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.25], [0.98, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.25], [10, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const iconStrokeDashoffset = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.5],
    [33.112, 33.112 * 1.75, 33.112 * 2]
  );

  return (
    <motion.div
      ref={target}
      className={styles.tile}
      style={{ scale, opacity, filter }}
    >
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
            strokeWidth={3}
          ></motion.path>
        </svg>
      </div>

      <div className="flex-1 col gap-4">
        <h3>{title}</h3>
        <p className="color-tertiary body-s">{description}</p>
      </div>
    </motion.div>
  );
};

const AnimatedChecklist: React.FC<Props> = ({ list }) => {
  const [selectedOption, setSelectedOption] = useState<null | string>(null);

  const handleItemClick = (id: string) => {
    setSelectedOption(id);
  };

  return (
    <div className={styles.wrapper}>
      {list.map((item) => (
        <AnimatedChecklistItem
          key={item.title}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default AnimatedChecklist;
