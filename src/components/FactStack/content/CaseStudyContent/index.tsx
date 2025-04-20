import type { Fact } from "../../../../consts/facts";

import { motion } from "framer-motion";

import Svg from "../../../Svg";

import { SVG_ARROW } from "../../../../consts/svg";

import styles from "./styles.module.css";

type Props = {
  card: Fact;
};

const SvgAnimated = motion.create(Svg);

const CaseStudyContent: React.FC<Props> = ({
  card: {
    payload: { title, link },
  },
}) => {
  return (
    <div className={styles.caseStudyCard}>
      <div className="col gap-m">
        <h2>Case study</h2>
        <p>{title}</p>
      </div>

      {link && (
        <motion.a
          href={link.href}
          whileHover="hover"
          whileTap="hover"
          rel={link.external ? "noopener noreferrer" : undefined}
          target={link.external ? "_blank" : undefined}
        >
          <span>{link.label}</span>

          <SvgAnimated
            variants={{
              hover: {
                x: 4,
                y: -4,
                stroke: "var(--background)",
              },
            }}
            transition={{ duration: 0.1 }}
            d={SVG_ARROW}
          />
        </motion.a>
      )}
    </div>
  );
};

export default CaseStudyContent;
