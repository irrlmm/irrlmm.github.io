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
    <ul className={styles.fact}>
      {tags && (
        <li className="row gap-8">
          {tags.map((tag, i) => (
            <span key={i} className="tag body-s">
              {tag}
            </span>
          ))}
        </li>
      )}

      <h4 className={styles.title}>{title}</h4>

      <p className={styles.text}>{text}</p>
    </ul>
  );
};

export default FactItem;
