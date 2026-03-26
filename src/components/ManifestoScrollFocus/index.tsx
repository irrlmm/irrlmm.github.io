import ScrollFocusParagraph from "../ScrollFocusParagraph";

import styles from "./styles.module.css";

type Props = {
  sentences: string[];
};

const ManifestoScrollFocus: React.FC<Props> = ({ sentences }) => {
  return (
    <section className="prose-escape max-width-l">
      {sentences.map((sentence, index) => (
        <ScrollFocusParagraph
          className={styles.sentence}
          key={`${sentence}-${index}`}
          text={sentence}
        />
      ))}
    </section>
  );
};

export default ManifestoScrollFocus;
