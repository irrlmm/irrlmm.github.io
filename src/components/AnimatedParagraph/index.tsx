import { motion } from "framer-motion";
import { Fragment } from "react/jsx-runtime";

import styles from "./styles.module.css";

type Line =
  | string
  | {
      type: "experience-picker";
      text: string;
      actions: {
        id: string;
        label: string;
        objects: { id: string; label: string }[];
      }[];
    };

type Props = {
  lines: Line[];
  size?: "s" | "m";
};

const AnimatedParagraph: React.FC<Props> = ({ lines, size = "m" }) => {
  return (
    <motion.p
      className={styles.paragraph}
      variants={{
        hidden: {},
        shown: { transition: { delayChildren: 0.25, staggerChildren: 0.15 } },
      }}
      initial="hidden"
      animate="shown"
      style={{ fontSize: `var(--unit-${size})` }}
    >
      {lines.map((l, i) => (
        <Fragment key={`line-${i}`}>
          <motion.span
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: 0.03 } },
            }}
          >
            {typeof l === "string" ? (
              l.split(" ").map((w, i) => (
                <motion.span
                  key={`word-${i}`}
                  variants={{
                    hidden: { opacity: 0 },
                    shown: { opacity: 1, transition: { duration: 0.15 } },
                  }}
                >
                  {w}{" "}
                </motion.span>
              ))
            ) : (
              <>
                <motion.span
                  variants={{
                    hidden: { opacity: 0 },
                    shown: { opacity: 1, transition: { duration: 0.15 } },
                  }}
                >
                  {l.text}
                </motion.span>{" "}
                <motion.select
                  variants={{
                    hidden: { opacity: 0 },
                    shown: { opacity: 1, transition: { duration: 0.15 } },
                  }}
                >
                  {l.actions.map((a) => (
                    <option key={a.id}>{a.label}</option>
                  ))}
                </motion.select>
              </>
            )}
          </motion.span>

          {i !== lines.length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </Fragment>
      ))}
    </motion.p>
  );
};

export default AnimatedParagraph;
