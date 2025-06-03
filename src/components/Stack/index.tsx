import { motion } from "framer-motion";

import Card from "../Card";

import styles from "./styles.module.css";
import HeroCard from "../HeroCard";
import CompetencesCard from "../CompetencesCard";

type Props = {
  src: string;
};

const Stack: React.FC<Props> = ({ src }) => {
  const items: React.JSX.Element[] = [
    <HeroCard src={src} />,
    <CompetencesCard />,
    <HeroCard src={src} />,
    // <HeroCard src={src} />, // TODO: about me page
  ];

  return (
    <motion.div
      className={styles.stack}
      variants={{
        hidden: {},
        shown: { transition: { delayChildren: 0.25, staggerChildren: 0.075 } },
      }}
      initial="hidden"
      animate="shown"
    >
      {items.map((item, index) => (
        <Card key={index}>{item}</Card>
      ))}
    </motion.div>
  );
};

export default Stack;
