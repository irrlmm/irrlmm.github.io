import AnimatedLinkButton from "../AnimatedLinkButton";

import styles from "./styles.module.css";

type Props = {
  card: UI.Card.ReleaseNote;
};

const ReleaseNoteContent: React.FC<Props> = ({
  card: { version, title, link },
}) => {
  return (
    <div className={styles.fact}>
      <div className={styles.header}>
        <h2>Release note</h2>
        <h3>v{version}</h3>
      </div>

      <p>{title}</p>

      {link && <AnimatedLinkButton {...link} />}
    </div>
  );
};

export default ReleaseNoteContent;
