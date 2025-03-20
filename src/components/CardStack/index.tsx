import React, { useEffect, useState } from "react";
import "./style.css";
import AchievementsCard from "./AchievementsCard";
import AnimatedCard from "./AnimatedCard";
import RefreshButton from "./RefreshButton";
import { motion } from "framer-motion";
import { SVG_CHECK } from "../../consts/svg";

export type CardType = {
  id: string;
  label?: string;
  value?: string;
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
      <div className="toolbar-top row gap-16 padding-32 align-center justify-between">
        <div className="row gap-16 align-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="none"
          >
            <motion.circle
              cx={12}
              cy={12}
              r={10}
              stroke="var(--outline)"
              animate={{
                opacity: hasViewedAll ? 0 : 0.33,
              }}
              strokeWidth={1.5}
            ></motion.circle>

            <motion.circle
              cx={12}
              animate={{
                opacity: hasViewedAll ? 0 : 1,
                strokeDashoffset:
                  2 * Math.PI * 10 * ((cards.length - progress) / cards.length),
              }}
              cy={12}
              r={10}
              style={{ rotate: -90, transformOrigin: "center" }}
              strokeWidth={1.5}
              stroke="var(--on-surface)"
              strokeDasharray={2 * Math.PI * 10}
            ></motion.circle>

            <motion.path
              d={SVG_CHECK}
              stroke="var(--accent)"
              animate={{ strokeDashoffset: hasViewedAll ? 0 : -100 }}
              strokeDasharray={100}
              strokeWidth={1.5}
              vector-effect="non-scaling-stroke"
            ></motion.path>
          </svg>

          <span className="body-m color-secondary card-stack-label-drag">
            {progress} / {cards.length}
          </span>
        </div>

        <RefreshButton onClick={handleClickRefresh} />
      </div>

      <div className="card-stack-container">
        {cardsShown.map((card, i) => (
          <AnimatedCard
            key={card.id}
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
