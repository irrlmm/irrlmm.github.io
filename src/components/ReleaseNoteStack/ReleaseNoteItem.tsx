import { type ReleaseNoteChange } from "../../consts/release-notes";

import styles from "./styles.module.css";

type Props = {
  card: ReleaseNoteChange;
};

const ReleaseNoteItem: React.FC<Props> = ({ card: { text } }) => {
  return (
    <div className={styles.card}>
      <p className="row gap-xs">{text}</p>
    </div>
  );
};

export default ReleaseNoteItem;
