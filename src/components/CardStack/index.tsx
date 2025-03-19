import React, { useEffect, useState } from "react";
import "./style.css";
import AchievementsCard from "./AchievementsCard";
import AnimatedCard from "./AnimatedCard";
import RefreshButton from "./RefreshButton";
import Svg from "../Svg";
import { SVG_CHECK } from "../../consts/svg";

export type CardType = {
  label: string;
  value: string;
  pre?: string;
  post?: string;
  icon?: string;
  description?: string;
};

const CardStack = ({ cards }: { cards: CardType[] }) => {
  const [hasViewedAll, setHasViewedAll] = useState(false);
  const [progress, setProgress] = useState(1);
  const [cardsShown, setCardsShown] = useState(cards.toReversed());
  const [shouldSwipe, setShouldSwipe] = useState(false);

  useEffect(() => {
    if (progress === cards.length && !hasViewedAll) {
      setHasViewedAll(true);
    }
  }, [progress]);

  const handleSwipe = () => {
    setShouldSwipe(false);
    setCardsShown([
      cardsShown[cardsShown.length - 1],
      ...cardsShown.slice(0, -1),
    ]);

    setProgress((p) => (p === cards.length ? 1 : (p += 1)));
  };

  const handleClickRefresh = () => {
    setShouldSwipe(true);
  };

  return (
    <div className="card-stack-wrapper">
      <div className="card-stack-toolbar">
        <div className="row gap-8 align-center">
          {hasViewedAll && (
            <Svg size={20} d={SVG_CHECK} stroke="var(--accent)" />
          )}

          <span className="body-s color-secondary card-stack-label-drag">
            {progress} / {cards.length}
          </span>
        </div>

        <span className="body-s color-secondary card-stack-label-drag">
          {"Swipe / Drag"}
        </span>

        <RefreshButton onClick={handleClickRefresh} />
      </div>

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
      </div>
    </div>
  );
};

export default CardStack;
