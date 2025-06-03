import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./styles.module.css";
import Svg from "../Svg";
import { SVG_DESIGN_SYSTEM, SVG_GOAL_MATCH, SVG_UI } from "../../consts/svg";
import { useRef } from "react";

type Props = {};

const TIMELINE = [
  {
    icon: SVG_DESIGN_SYSTEM,
    label: "Design systems",
    description: "A key to ensure rapid product scalability",
  },
  {
    icon: SVG_UI,
    label: "Handcrafted UIs",
    description: "Sexy and usable",
  },
  { icon: SVG_GOAL_MATCH, label: "Goals", description: "Sexy and usable" },
];

const TimelineCard: React.FC<Props> = ({}) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: target,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-45%", "45%"]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.9, 0.95]);

  return (
    <motion.div
      ref={target}
      className={styles.competencesCard}
      style={{ y, scale }}
    >
      <h3>My expertise</h3>

      <div className={styles.separator} />

      <ul className={styles.competencesList}>
        {TIMELINE.map((c) => (
          <li className={styles.competenceItem} key={c.label}>
            <Svg
              d={c.icon}
              size="var(--unit-xl)"
              stroke="var(--on-surface-var)"
            />

            <div>
              <h3>{c.label}</h3>
              <p>{c.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TimelineCard;
