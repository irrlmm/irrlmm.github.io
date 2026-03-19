import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";

import StackProgressToolbar from "../StackProgressToolbar";
import GameCard from "./GameCard";
import GameIntro from "./GameIntro";
import GameOutro from "./GameOutro";

import { SVG_KEY } from "../../consts/svg";
import type {
  CardGame,
  CardGameOption,
  CardGameStat,
  CardGameThemeColors,
} from "../../types/content";

import { useHoverElement } from "../../helpers/lightbox";

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
  themeColors?: CardGameThemeColors;
};

const Game: React.FC<Props> = ({ game, themeColors }) => {
  const normalizeStatConfig = (
    input: CardGameStat | undefined,
    fallback: ResolvedStatConfig,
  ): ResolvedStatConfig => {
    const min = input?.min ?? fallback.min;
    const rawMax = input?.max ?? fallback.max;
    const max = rawMax <= min ? min + 1 : rawMax;
    const initialRaw = input?.initial ?? fallback.initial;
    const initial = Math.max(min, Math.min(initialRaw, max));

    return {
      label: input?.label ?? fallback.label,
      min,
      max,
      initial,
    };
  };

  const healthConfig = useMemo(
    () =>
      normalizeStatConfig(game.stats?.health, {
        label: "HP",
        min: 0,
        max: 100,
        initial: 50,
      }),
    [game.stats?.health],
  );

  const armorConfig = useMemo(
    () =>
      normalizeStatConfig(game.stats?.armor, {
        label: "AR",
        min: 0,
        max: 100,
        initial: 50,
      }),
    [game.stats?.armor],
  );

  const [isIntroShown, setIsIntroShown] = useState(true);
  const [points, setPoints] = useState(0);
  const [health, setHealth] = useState(healthConfig.initial);
  const [armor, setArmor] = useState(armorConfig.initial);
  const [currentCardId, setCurrentCardId] = useState(game.startCardId);
  const [endingId, setEndingId] = useState<string | null>(null);

  const hover = useHoverElement<HTMLDivElement>({
    resetsToCenter: true,
  });

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

  const currentCard = isFinished ? null : cardsById.get(currentCardId) ?? null;

  const resolveEnding = (id: string) => {
    const ending = game.outro.endings.find((item) => item.id === id);
    if (!ending) {
      throw new Error(`Game "${game.id}" has unknown endingId "${id}".`);
    }

    return ending;
  };

  const ending = endingId ? resolveEnding(endingId) : null;

  const gameThemeStyle = useMemo(() => {
    if (!themeColors) {
      return undefined;
    }

    const colors = themeColors;

    return {
      "--surface": colors.surface,
      "--surface-dim": colors.surfaceDim,
      "--on-surface": colors.onSurface,
      "--on-surface-var": `color-mix(in srgb, ${colors.onSurface} 66%, transparent)`,
      "--overlay-on-surface": colors.overlayOnSurface,
      "--outline": colors.outline,
      "--accent": colors.primary,
      "--on-accent": colors.onAccent,
      "--inverse-surface": colors.primary,
      "--inverse-on-surface": colors.onAccent,
    } as React.CSSProperties;
  }, [themeColors]);

  const handleBeginGame = () => {
    setIsIntroShown(false);
  };

  const handleRestart = () => {
    setCurrentCardId(game.startCardId);
    setEndingId(null);
    setPoints(0);
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

    setPoints((prev) => prev + option.points);
    setHealth(nextHealth);
    setArmor(nextArmor);

    if (nextHealth <= healthConfig.min) {
      resolveEnding("dead");
      setEndingId("dead");
      setCurrentCardId(game.finishCardId);
      return;
    }

    if (option.endingId && option.nextCardId !== game.finishCardId) {
      throw new Error(
        `Game "${game.id}" card "${currentCardId}" has endingId on non-terminal option "${option.id ?? option.label}".`,
      );
    }

    if (option.nextCardId === game.finishCardId) {
      if (!option.endingId) {
        throw new Error(
          `Game "${game.id}" card "${currentCardId}" option "${option.id ?? option.label}" reaches finish without endingId.`,
        );
      }

      resolveEnding(option.endingId);
      setEndingId(option.endingId);
      setCurrentCardId(game.finishCardId);
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
      className={`ui-stack ${styles.wrapper}`}
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
          bars={[
            {
              progress:
                (health - healthConfig.min) / (healthConfig.max - healthConfig.min),
              text: `${healthConfig.label} ${health}`,
            },
            {
              progress:
                (armor - armorConfig.min) / (armorConfig.max - armorConfig.min),
              text: `${armorConfig.label} ${armor}`,
            },
            {
              icon: SVG_KEY,
              text: `Score ${points}`,
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
            ref={hover.wrapperRef}
            key={currentCard.id}
            className={styles.wrapper}
            onPointerMove={hover.onPointerMove}
            onPointerLeave={hover.onPointerLeave}
            variants={cardVariants}
            initial="hidden"
            animate="shown"
            exit="hidden"
          >
            <AnimatePresence>
              <GameCard
                key={currentCard.id}
                index={0}
                card={currentCard}
                onChooseOption={handleChooseOption}
                moveX={hover.x}
                moveY={hover.y}
              />
            </AnimatePresence>
          </motion.div>
        )}

        {!isIntroShown && (isFinished || !currentCard) && (
          <GameOutro
            points={points}
            title={game.outro.title}
            ending={
              ending ??
              (() => {
                throw new Error(
                  `Game "${game.id}" reached finish without a resolved endingId.`,
                );
              })()
            }
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Game;
