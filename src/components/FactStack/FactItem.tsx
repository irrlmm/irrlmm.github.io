import styles from "./styles.module.css";

export type Fact = {
  id: string;
  title: string;
  text: string;
  tags?: string[];
};

type Props = {
  card: Fact;
  isActive: boolean;
};

const FactItem: React.FC<Props> = ({
  card: { text, title, tags },
  isActive,
}) => {
  return (
    <div className={styles.fact}>
      {tags && (
        <div className="row gap-8">
          {tags.map((tag, i) => (
            <span key={i} className="tag body-s">
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className={styles.title}>{title}</span>

      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default FactItem;
