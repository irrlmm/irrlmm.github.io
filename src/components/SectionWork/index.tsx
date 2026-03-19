import { motion } from "framer-motion";

import CardArticle from "../CardArticle";
import CardStack from "../CardStack";
import CardWork from "../CardWork";
import styles from "./styles.module.css";

import type { CollectionEntryType } from "./types";
import type { ArtifactStackCollectionEntry, StackImageLayer } from "./types";

type Props = {
  items: CollectionEntryType[];
};

const SectionWork: React.FC<Props> = ({ items }) => (
  <motion.div
    className={`ui-grid max-width-l ${styles.wrapper}`}
    variants={{
      hidden: {},
      shown: {
        transition: {
          delayChildren: 0.15,
          staggerChildren: 0.15,
        },
      },
    }}
    initial="hidden"
    animate="shown"
  >
    {items.map((item) => {
      if (item.collection === "artifacts") {
        if (isArtifactStackCollectionEntry(item)) {
          return <CardStack key={item.id} item={item} />;
        }

        return <CardArticle key={item.id} item={item} />;
      }

      return <CardWork key={item.id} item={item} />;
    })}
  </motion.div>
);

const isStackImageLayer = (image: unknown): image is StackImageLayer =>
  Boolean(
    image &&
      typeof image === "object" &&
      "src" in image &&
      "imageColors" in image,
  );

const isArtifactStackCollectionEntry = (
  item: CollectionEntryType,
): item is ArtifactStackCollectionEntry =>
  item.collection === "artifacts" &&
  item.data.type === "stack" &&
  Array.isArray(item.data.images) &&
  item.data.images.every(isStackImageLayer);

export default SectionWork;
