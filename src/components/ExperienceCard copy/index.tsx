import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./styles.module.css";
import Svg from "../Svg";
import {
  SVG_DESIGN_SYSTEM,
  SVG_GEM,
  SVG_GOAL_MATCH,
  SVG_UI,
} from "../../consts/svg";
import { useRef } from "react";

type Props = {};

const EXPERIENCE = [
  {
    year: "2017",
    company: "Uniyo",
    position: "Founding Mobile Engineer",
  },
  {
    year: "2018",
    company: "iMusician",
    position: "UI Engineer",
  },
  {
    year: "2020",
    company: "iMusician",
    position: "Senior Product Designer",
  },
];

const ExperienceCard: React.FC<Props> = ({}) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: target,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-60%", "60%"]);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <>
      <motion.div
        ref={target}
        className={styles.competencesCard}
        style={{ y, scale }}
      >
        <ul className={styles.competencesList}>
          {EXPERIENCE.map((c) => (
            <li className={styles.competenceItem} key={c.year}>
              <h3 className={styles.competenceYear}>{c.year}</h3>

              <p>
                {c.position}{" "}
                <span className="color-secondary">@ {c.company}</span>
              </p>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className={styles.decorTop} />
      <div className={styles.decorBottom} />
    </>
  );
};

export default ExperienceCard;
