import { motion } from "framer-motion";
import styles from "./styles.module.css";

type Props<T extends string> = {
  types: T[];
  selectedType: T;
  onSelect: (filterType: T) => void;
};

const SectionWorkTabs = <T extends string>({
  types,
  selectedType,
  onSelect,
}: Props<T>) => {
  return (
    <div className={styles.filters} role="tablist">
      {types.map((type) => {
        const isSelected = selectedType === type;

        return (
          <motion.button
            key={type}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={styles.chip}
            animate={isSelected ? "selected" : "default"}
            whileTap="pressed"
            variants={{
              default: {
                backgroundColor: "transparent",
                color: "var(--on-surface)",
              },
              pressed: {
                scale: 0.975,
              },
              selected: {
                backgroundColor: "var(--on-surface)",
                color: "var(--background)",
              },
            }}
            onClick={() => onSelect(type)}
          >
            <span className="overline-s">{type}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SectionWorkTabs;
