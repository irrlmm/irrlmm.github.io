import Svg from "../Svg";
import styles from "./styles.module.css";

export type Fact = {
  id: string;
  icon?: string;
  text: string;
};

type Props = {
  card: Fact;
};

const FactItem: React.FC<Props> = ({ card: { text, icon } }) => {
  return (
    <ul className={styles.fact}>
      {icon && (
        <div className={styles.iconWrapper}>
          <Svg d={icon} size="var(--unit-l)" />
        </div>
      )}

      <p className={styles.text}>{text}</p>
    </ul>
  );
};

export default FactItem;
