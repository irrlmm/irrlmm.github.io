import type { CollectionEntry } from "astro:content";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import CardArticle from "../CardArticle";
import CardWork from "../CardWork";
import SectionWorkTabs from "../SectionWorkTabs/SectionWorkTabs";

import styles from "./styles.module.css";
import type { LightningEffectInput } from "../../helpers/stackedImageLightShadow";

type WorkCollectionWithOrgInfo = CollectionEntry<"work"> & {
  data: CollectionEntry<"work">["data"] & {
    orgImage: string;
    orgName: string;
    coverImageColor: string;
  };
};

type CollectionEntryType = CollectionEntry<"blog"> | WorkCollectionWithOrgInfo;
type CollectionType = CollectionEntryType["collection"];
type FilterType = "all" | CollectionType;

type Props = {
  items: CollectionEntryType[];
};

export const cardLightningEffectConfig: LightningEffectInput = {
  tilt: 12.5,
  lightEffectIntensity: 0.5,
};

const SectionWork: React.FC<Props> = ({ items }) => {
  const [selectedType, setSelectedType] = useState<FilterType>("all");

  const filterTypes = useMemo<FilterType[]>(() => {
    const uniqueCollections = [
      ...new Set(items.map((item) => item.collection)),
    ];
    return ["all", ...uniqueCollections];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedType === "all") {
      return items;
    }

    return items.filter((item) => item.collection === selectedType);
  }, [items, selectedType]);

  return (
    <div className={`ui ${styles.wrapper}`}>
      <SectionWorkTabs
        types={filterTypes}
        selectedType={selectedType}
        onSelect={setSelectedType}
      />

      <AnimatePresence presenceAffectsLayout>
        {filteredItems.map((item) => {
          if (item.collection === "blog") {
            return <CardArticle key={item.id} item={item} />;
          }

          return <CardWork key={item.id} item={item} />;
        })}
      </AnimatePresence>
    </div>
  );
};

export default SectionWork;
