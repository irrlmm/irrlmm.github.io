import type { CardType } from ".";
import "./style.css";

type Props = {
  card: CardType;
};

const AchievementsCard = ({ card }: Props) => {
  return (
    <div className="achievements-card col justify-between align-center flex-1 gap-32 padding-32">
      <h3>{card.label}</h3>

      <div className="col align-center gap-4">
        {card.pre && <span className="body-m color-secondary">{card.pre}</span>}

        <span className="display">{card.value}</span>

        {card.post && (
          <span className="body-s color-secondary">{card.post}</span>
        )}
      </div>

      <p className="body-s color-secondary">{card.description}</p>
    </div>
  );
};

export default AchievementsCard;
