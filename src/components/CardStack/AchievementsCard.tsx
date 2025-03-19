import type { CardType } from ".";
import Svg from "../Svg";
import "./style.css";

type Props = {
  card: CardType;
  isActive: boolean;
};

const AchievementsCard = ({ card, isActive }: Props) => (
  <div className="achievements-card col padding-32 gap-16">
    {card.label && <h3>{card.label}</h3>}

    <div className="col gap-8 flex-1 justify-center">
      {card.icon && (
        <div className="col flex-1 align-center justify-center">
          <Svg
            d={card.icon}
            size={"50%"}
            stroke={isActive ? "var(--accent)" : "var(--on-surface-var-2)"}
          />
        </div>
      )}

      {card.pre && <span className="body-l color-secondary">{card.pre}</span>}
      <span className="display">{card.value}</span>
      {card.post && <span className="body-l color-secondary">{card.post}</span>}
    </div>

    <p className="body-m color-secondary">{card.description}</p>
  </div>
);

export default AchievementsCard;
