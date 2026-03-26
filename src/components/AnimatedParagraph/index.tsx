import { motion } from "framer-motion";

const AnimatedParagraph: React.FC<{
  text: string;
  key: string;
  animate?: boolean;
  className?: string;
  onAnimationComplete?: () => void;
}> = ({ className, text, key, animate = true, onAnimationComplete }) => {
  const variants = {
    hidden: {},
    show: {},
  };

  const childrenVariants = {
    hidden: { opacity: 0 },
    shown: { opacity: 1, transition: { duration: 0.05 } },
  };

  return (
    <motion.p
      className={`overline text-m ${className}`}
      variants={variants}
      transition={{ delayChildren: 0.15, staggerChildren: 0.0125 }}
      initial="hidden"
      animate={animate && "shown"}
      onAnimationComplete={onAnimationComplete}
    >
      {text.split("").map((c, i) => (
        <motion.span key={`${key}-${i}`} variants={childrenVariants}>
          {c}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimatedParagraph;
