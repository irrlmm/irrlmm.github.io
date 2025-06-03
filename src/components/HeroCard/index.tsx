import { motion } from "framer-motion";

import styles from "./styles.module.css";

type Props = {
  src: string;
};

const HeroCard: React.FC<Props> = ({ src }) => (
  <div className={styles.heroCard}>
    <motion.img
      variants={{
        hidden: {
          opacity: 0,
          filter: "contrast(3) blur(16px)",
          scale: 1.05,
        },
        shown: {
          opacity: 1,
          filter: "contrast(1) blur(0px)",
          scale: 1,
          transition: { duration: 0.66, bounce: 0 },
        },
      }}
      className={styles.heroImage}
      src={src}
      loading="eager"
      alt="Igor's photo"
    />
    <h1>Hello. I'm Igor</h1>
    <p>
      I'm a senior product designer <br />
      and an ex-engineer
    </p>
  </div>
);

export default HeroCard;
