import { type Fact } from "../../../../consts/facts";

import styles from "./styles.module.css";

type Props = {
  card: Fact;
};

const ReleaseNoteContent: React.FC<Props> = ({
  card: {
    payload: { title, lines },
  },
}) => {
  return (
    <div className={styles.fact}>
      <div className={styles.header}>
        <h2>Release note</h2>
        <h3>{title}</h3>
      </div>

      {lines && (
        <ul className={styles.lines}>
          {lines.map((l, i) => (
            <li className="row gap-xs" key={i}>
              <span>•</span>
              <span className="flex-1">{l}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReleaseNoteContent;
