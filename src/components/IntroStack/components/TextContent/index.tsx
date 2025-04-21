import Svg from "../../../Svg";

import styles from "./styles.module.css";

type Props = {
  card: UI.Card.Fact;
};

const TextContent: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.fact}>
      {card.icon && (
        <div className={styles.iconWrapper}>
          {card.icon.path ? (
            <Svg d={card.icon.path} size="var(--unit-l)" />
          ) : (
            card.icon.text && (
              <span className={styles.iconText}>{card.icon.text}</span>
            )
          )}
        </div>
      )}

      <p className={styles.text}>{card.text || ""}</p>
    </div>
  );
};

export default TextContent;
