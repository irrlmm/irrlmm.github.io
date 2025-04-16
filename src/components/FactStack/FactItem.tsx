import type { Fact } from "../../consts/facts";
import Svg from "../Svg";
import styles from "./styles.module.css";

type Props = {
  card: Fact;
};

const FactItem: React.FC<Props> = ({ card: { text, icon } }) => {
  return (
    <ul className={styles.fact}>
      {icon && (
        <div className={styles.iconWrapper}>
          {icon.path && <Svg d={icon.path} size="var(--unit-l)" />}
          {icon.text && <span className={styles.iconText}>{icon.text}</span>}
        </div>
      )}

      <p className={styles.text}>{text}</p>
    </ul>
  );
};

export default FactItem;
