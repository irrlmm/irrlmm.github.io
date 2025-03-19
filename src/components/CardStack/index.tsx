import React, { useState } from "react";
import "./style.css";
import AchievementsCard from "./AchievementsCard";
import AnimatedCard from "./AnimatedCard";
import RefreshButton from "./RefreshButton";

export type CardType = {
  label: string;
  value: string;
  pre?: string;
  post?: string;
  description?: string;
};

const CardStack = ({ cards }: { cards: CardType[] }) => {
  const [cardsShown, setCardsShown] = useState(cards);
  const [shouldSwipe, setShouldSwipe] = useState(false);

  const handleSwipe = () => {
    setShouldSwipe(false);
    setCardsShown([
      cardsShown[cardsShown.length - 1],
      ...cardsShown.slice(0, -1),
    ]);
  };

  const handleClickRefresh = () => {
    setShouldSwipe(true);
  };

  return (
    <div className="card-stack-container">
      {cardsShown.map((card, i) => (
        <AnimatedCard
          key={card.label}
          card={card}
          isActive={i === cardsShown.length - 1}
          onSwipe={handleSwipe}
          shouldSwipe={i === cardsShown.length - 1 && shouldSwipe}
          renderItem={AchievementsCard}
        />
      ))}

      <span className="body-s color-secondary">{"< Swipe / Drag >"}</span>

      <RefreshButton onClick={handleClickRefresh} />
    </div>
  );
};

export default CardStack;
