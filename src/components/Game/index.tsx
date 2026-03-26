import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";

import StackProgressToolbar from "../StackProgressToolbar";
import GameCard from "./GameCard";
import GameIntro from "./GameIntro";
import GameOutro from "./GameOutro";

import type {
  CardGame,
  CardGameOption,
  CardGameStat,
  CardGameThemeByMode,
  CardGameThemeColors,
} from "../../types/content";

import styles from "./styles.module.css";

type ResolvedStatConfig = {
  label: string;
  min: number;
  max: number;
  initial: number;
};

export const coverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(0.5rem)",
  },
  shown: {
    opacity: 1,
    scale: 1,
    filter: "blur(0rem)",
    transition: {
      delay: 0.25,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(0.5rem)",
  },
  shown: {
    opacity: 1,
    filter: "blur(0rem)",
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
    },
  },
};

type Props = {
  game: CardGame;
  themeColors?: CardGameThemeByMode;
};

const Game: React.FC<Props> = ({ game, themeColors }) => {
  const resolveStatConfig = (
    statName: "health" | "armor",
    stat: CardGameStat,
  ): ResolvedStatConfig => {
    const { label, min, max, initial } = stat;

    if (max <= min) {
      throw new Error(
        `Game "${game.id}" has invalid ${statName} range: max (${max}) must be greater than min (${min}).`,
      );
    }

    if (initial < min || initial > max) {
      throw new Error(
        `Game "${game.id}" has invalid ${statName} initial value (${initial}): it must be within [${min}, ${max}].`,
      );
    }

    return {
      label,
      min,
      max,
      initial,
    };
  };

  const healthConfig = useMemo(
    () => resolveStatConfig("health", game.stats.health),
    [game.id, game.stats.health],
  );

  const armorConfig = useMemo(
    () => resolveStatConfig("armor", game.stats.armor),
    [game.id, game.stats.armor],
  );

  const [isIntroShown, setIsIntroShown] = useState(true);
  const [health, setHealth] = useState(healthConfig.initial);
  const [armor, setArmor] = useState(armorConfig.initial);
  const [currentCardId, setCurrentCardId] = useState(game.startCardId);
  const [endingId, setEndingId] = useState<string | null>(null);

  const cardsById = useMemo(() => {
    return game.cards.reduce<Map<string, CardGame["cards"][number]>>(
      (map, card) => {
        map.set(card.id, card);
        return map;
      },
      new Map(),
    );
  }, [game.cards]);

  const isFinished = currentCardId === game.finishCardId;

  const currentCard = isFinished
    ? null
    : (cardsById.get(currentCardId) ?? null);

  if (!isFinished && !currentCard) {
    throw new Error(
      `Game "${game.id}" has unknown currentCardId "${currentCardId}".`,
    );
  }

  const resolveEnding = (id: string) => {
    const ending = game.outro.endings.find((item) => item.id === id);
    if (!ending) {
      throw new Error(`Game "${game.id}" has unknown endingId "${id}".`);
    }

    return ending;
  };

  const finishGame = (nextEndingId: string) => {
    resolveEnding(nextEndingId);
    setEndingId(nextEndingId);
    setCurrentCardId(game.finishCardId);
  };

  const gameThemeStyle = themeColors
    ? (Object.fromEntries(
        Object.entries(themeColors.dark).map(([key, darkValue]) => [
          key,
          `light-dark(${themeColors.light[key as keyof CardGameThemeColors]}, ${darkValue})`,
        ]),
      ) as React.CSSProperties)
    : undefined;

  const handleBeginGame = () => {
    setIsIntroShown(false);
  };

  const handleRestart = () => {
    setCurrentCardId(game.startCardId);
    setEndingId(null);
    setHealth(healthConfig.initial);
    setArmor(armorConfig.initial);
    setIsIntroShown(true);
  };

  const handleChooseOption = (option: CardGameOption) => {
    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(value, max));

    const nextHealth = clamp(
      health + (option.healthDelta ?? 0),
      healthConfig.min,
      healthConfig.max,
    );
    const nextArmor = clamp(
      armor + (option.armorDelta ?? 0),
      armorConfig.min,
      armorConfig.max,
    );

    setHealth(nextHealth);
    setArmor(nextArmor);

    if (nextHealth <= healthConfig.min) {
      finishGame("dead");
      return;
    }

    if (option.nextCardId === game.finishCardId) {
      finishGame(option.endingId!);
      return;
    }

    if (!cardsById.has(option.nextCardId)) {
      throw new Error(
        `Game "${game.id}" card "${currentCardId}" points to unknown nextCardId "${option.nextCardId}".`,
      );
    }

    setCurrentCardId(option.nextCardId);
  };

  return (
    <motion.div
      className={`ui-stack col ${styles.wrapper}`}
      style={gameThemeStyle}
      variants={{
        hidden: {},
        shown: {
          transition: {
            delayChildren: 0.15,
          },
        },
      }}
      initial="hidden"
      animate="shown"
    >
      {!isIntroShown && (
        <StackProgressToolbar
          className={styles.toolbar}
          bars={[
            {
              progress:
                (health - healthConfig.min) /
                (healthConfig.max - healthConfig.min),
              text: `${healthConfig.label} ${health}`,
            },
            {
              progress:
                (armor - armorConfig.min) / (armorConfig.max - armorConfig.min),
              text: `${armorConfig.label} ${armor}`,
            },
          ]}
        />
      )}

      <AnimatePresence mode="wait" presenceAffectsLayout>
        {isIntroShown && (
          <GameIntro
            key="intro"
            title={game.intro.title}
            text={game.intro.text}
            onClick={handleBeginGame}
          />
        )}

        {!isIntroShown && !isFinished && currentCard && (
          <motion.div
            key={currentCard.id}
            className={styles.container}
            variants={cardVariants}
            initial="hidden"
            animate="shown"
            exit="hidden"
          >
            <GameCard
              key={currentCard.id}
              index={0}
              card={currentCard}
              onChooseOption={handleChooseOption}
            />
          </motion.div>
        )}

        {!isIntroShown && isFinished && endingId && (
          <GameOutro
            title={game.outro.title}
            ending={resolveEnding(endingId)}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Game;
