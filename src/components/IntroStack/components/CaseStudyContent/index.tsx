import AnimatedLinkButton from "../../../AnimatedLinkButton";

import styles from "./styles.module.css";

type Props = {
  card: UI.Card.CaseStudy;
};

const CaseStudyContent: React.FC<Props> = ({ card: { title, link } }) => {
  return (
    <div className={styles.caseStudyCard}>
      <div className="col gap-m">
        <h2>Read now</h2>
        <p>{title}</p>
      </div>

      {link && <AnimatedLinkButton {...link} />}
    </div>
  );
};

export default CaseStudyContent;
