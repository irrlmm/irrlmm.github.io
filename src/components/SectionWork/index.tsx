import { motion } from "framer-motion";

import CardArticle from "../cards/CardArticle";
import CardStack from "../cards/CardStack";
import CardWork from "../cards/CardWork";

import { variants } from "./const";

import type { SectionWorkItem } from "./types";

import styles from "./styles.module.css";

type Props = {
  items: SectionWorkItem[];
};

const renderCard = (entry: SectionWorkItem) => {
  switch (entry.kind) {
    case "artifact-note":
      return <CardArticle key={entry.item.id} item={entry.item} />;
    case "artifact-stack":
      return <CardStack key={entry.item.id} item={entry.item} />;
    case "work-default":
      return <CardWork key={entry.item.id} item={entry.item} />;
  }
};

const SectionWork: React.FC<Props> = ({ items }) => (
  <motion.div
    className={`prose-escape ui-grid max-width-l ${styles.wrapper}`}
    variants={variants}
    initial="hidden"
    animate="shown"
  >
    {items.map(renderCard)}
  </motion.div>
);

export default SectionWork;
