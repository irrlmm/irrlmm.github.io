import { type Fact } from "../../../../consts/facts";

import Svg from "../../../Svg";

import styles from "./styles.module.css";

type Props = {
  card: Fact;
};

const TextContent: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.fact}>
      {card.payload.icon && (
        <div className={styles.iconWrapper}>
          {card.payload.icon.path && (
            <Svg d={card.payload.icon.path} size="var(--unit-l)" />
          )}

          {card.payload.icon.text && (
            <span className={styles.iconText}>{card.payload.icon.text}</span>
          )}
        </div>
      )}

      <p className={styles.text}>{card.payload.text || ""}</p>
    </div>
  );
};

export default TextContent;
