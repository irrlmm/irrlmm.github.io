import ScrollFocusParagraph from "../ScrollFocusParagraph";

import styles from "./styles.module.css";

type Props = {
  sentences: string[];
};

const ManifestoScrollFocus: React.FC<Props> = ({ sentences }) => {
  return (
    <section className="prose-escape max-width-l">
      <ScrollFocusParagraph className={styles.sentence} sentences={sentences} />
    </section>
  );
};

export default ManifestoScrollFocus;
