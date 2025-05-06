import { motion } from "framer-motion";
import { Fragment } from "react/jsx-runtime";

type Props = {
  lines: string[];
  size?: "xs" | "s" | "m";
};

const AnimatedParagraph: React.FC<Props> = ({ lines, size = "m" }) => {
  return (
    <motion.p
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
            {l.split(" ").map((w, i) => (
              <motion.span
                key={`word-${i}`}
                variants={{
                  hidden: { opacity: 0 },
                  shown: { opacity: 1, transition: { duration: 0.15 } },
                }}
              >
                {w}{" "}
              </motion.span>
            ))}
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
