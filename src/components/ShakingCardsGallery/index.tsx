import JumboProjectCard from "../JumboProjectCard";

import styles from "./styles.module.css";

type Props = {
  content: { imgSrc: string; chip?: string; logo?: string }[];
  cardClassName?: string;
};

const ShakingCardsGallery: React.FC<Props> = ({ content, cardClassName }) => {
  return (
    <div className={styles.container}>
      {content.map(({ imgSrc, chip, logo }) => (
        <JumboProjectCard
          key={imgSrc}
          src={imgSrc}
          chip={chip}
          logo={logo}
          className={cardClassName}
        />
      ))}
    </div>
  );
};

export default ShakingCardsGallery;
