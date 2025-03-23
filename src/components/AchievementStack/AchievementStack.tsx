import CardStack from "../CardStack";
import AchievementItem, { type Achievement } from "./AchievementItem";

type Props = {
  cards: Achievement[];
};

const AchievementStack: React.FC<Props> = ({ cards }) => (
  <CardStack cards={cards} renderItem={AchievementItem} />
);

export default AchievementStack;
