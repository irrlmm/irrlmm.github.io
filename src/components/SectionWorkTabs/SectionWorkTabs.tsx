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
            whileHover="hovered"
            whileTap="pressed"
            variants={{
              default: {
                backgroundColor: "transparent",
                color: "var(--on-surface)",
                border: "solid var(--line) var(--on-surface)",
              },
              hovered: {
                scale: 1.05,
              },
              pressed: {
                scale: 0.95,
              },
              selected: {
                backgroundColor: "var(--on-surface)",
                color: "var(--background)",
                border: "none",
              },
            }}
            onClick={() => onSelect(type)}
          >
            <span className="overline-m">{type}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SectionWorkTabs;
