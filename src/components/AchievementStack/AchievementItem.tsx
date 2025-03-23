import AnimatedMedal from "../AnimatedMedal";
import styles from "./styles.module.css";

export type Achievement = {
  id: string;
  label?: string;
  description?: string;
  icon?: string;
};

type Props = {
  card: Achievement;
  isActive: boolean;
};

const AchievementsCard: React.FC<Props> = ({ card, isActive }) => {
  return (
    <div className={styles.card}>
      <h3>{card.label}</h3>

      <div className="col gap-8">
        <AnimatedMedal isAnimated={isActive} />
      </div>

      <p className="body-m">{card.description}</p>
    </div>
  );
};

export default AchievementsCard;
