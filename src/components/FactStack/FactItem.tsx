import styles from "./styles.module.css";

export type Fact = {
  id: string;
  title: string;
  text: string;
  image?: string;
  tags?: string[];
};

type Props = {
  card: Fact;
  isActive: boolean;
};

const FactItem: React.FC<Props> = ({
  card: { text, title, image, tags },
  isActive,
}) => {
  return (
    <div className="flex-1 col gap-24 padding-32 justify-between">
      {tags && (
        <div className="row gap-8">
          {tags.map((tag, i) => (
            <span key={i} className="tag body-s">
              {tag}
            </span>
          ))}
        </div>
      )}

      {image && <img className={styles.image} src={image} />}

      <div className="col gap-16">
        <h3 className={styles.text}>{title}</h3>
        <p className="body-m color-secondary">{text}</p>
      </div>
    </div>
  );
};

export default FactItem;
