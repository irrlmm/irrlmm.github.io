import type { CardType } from ".";
import Svg from "../Svg";
import "./style.css";

type Props = {
  card: CardType;
};

const AchievementsCard = ({ card }: Props) => {
  return (
    <div className="achievements-card col justify-center align-center flex-1 gap-16 padding-32">
      {card.icon && <Svg d={card.icon} size={48} />}

      <h3>{card.label}</h3>

      <p className="body-s color-secondary">{card.description}</p>
    </div>
  );
};

export default AchievementsCard;
