import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

type ScrollFocusParagraphProps = {
  text?: string;
  sentences?: string[];
  className?: string;
  debug?: boolean;
};

/**
 * Word map entry (measured from actual rendered layout).
 * - lineIndex: visual line number (top -> bottom)
 * - wordIndexInLine: word order within that line (left -> right)
 * - wordsInLine: total words in that line
 *
 * Why we keep this map:
 * text wraps responsively, so line membership changes with width/font/zoom.
 * We need real layout data to keep stagger line-relative and avoid drift.
 */
type WordLayout = {
  lineIndex: number;
  wordIndexInLine: number;
  wordsInLine: number;
  staggerDelay: number;
};

type WordProps = {
  text: string;
  scrollY: MotionValue<number>;
  layout: WordLayout;
  measureRef?: (node: HTMLSpanElement | null) => void;
};

type Token = { kind: "word"; value: string } | { kind: "break" };
type LineMeta = { count: number; firstWord: number; lastWord: number };

const MIN_OPACITY = 0.08;
const WORD_MAP_START = 0.8;
const WORD_MAP_END = 0.3;
const POP_TRANSITION = 0.0125;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const isNonEmptyWord = (value: string) => value.trim().length > 0;
const getFallbackLayout = (wordIndexInLine: number): WordLayout => ({
  lineIndex: 0,
  wordIndexInLine,
  wordsInLine: 1,
  staggerDelay: 0,
});
const isSameWordLayouts = (previous: WordLayout[], next: WordLayout[]) =>
  previous.length === next.length &&
  previous.every((entry, index) => {
    const candidate = next[index];

    return (
      entry.lineIndex === candidate.lineIndex &&
      entry.wordIndexInLine === candidate.wordIndexInLine &&
      entry.wordsInLine === candidate.wordsInLine &&
      entry.staggerDelay === candidate.staggerDelay
    );
  });

/**
 * High-level goal:
 * Keep attention on one thought at a time while scrolling:
 * - words only "light up" in a focus band of the viewport
 * - words in the same line are slightly staggered
 * - no word is allowed to drift outside the line's band
 *
 * This function is the core mapper: (word position in viewport) -> opacity.
 *
 * Mental model:
 * yRatio = y / viewportHeight
 * 1.0 = bottom of viewport, 0.0 = top of viewport
 *
 * For each word:
 * - start = WORD_MAP_START + staggerStep * (lastWordIndex - wordIndexInLine)
 * - end = WORD_MAP_END
 * - opacity pops in near start and pops out near end
 *
 * ASCII timeline (single word):
 * yRatio: 1.00 -------------------------------> 0.00
 *         off   enter ramp     ON      exit ramp   off
 *               (start..start-POP)    (end+POP..end)
 * opacity: ____/^^^^^^^^^^^^^^^^^^^^^^^^\____
 *
 * Why the stagger cap exists:
 * Stagger model:
 * - each line gets maximum lead from the bottom edge: (1 - WORD_MAP_START)
 * - per-word step = lineSpan / (wordsInLine - 1)
 * - fewer words => bigger step (slower spread), more words => smaller step
 *
 * We still cap line span by measured line gaps to preserve sequence:
 * next-line first word cannot appear before previous-line last word.
 */

const getWordOpacity = (
  y: number,
  viewportHeight: number,
  layout: WordLayout,
) => {
  const yRatio = y / Math.max(viewportHeight, 1);
  const lastWordIndex = Math.max(layout.wordsInLine - 1, 0);
  const leadSteps = lastWordIndex - layout.wordIndexInLine;
  const start = WORD_MAP_START + layout.staggerDelay * leadSteps;
  const enterProgress = clamp01((start - yRatio) / POP_TRANSITION);
  const exitProgress = clamp01((yRatio - WORD_MAP_END) / POP_TRANSITION);
  const visibility = enterProgress * exitProgress;

  return MIN_OPACITY + visibility * (1 - MIN_OPACITY);
};

const ScrollFocusWord: React.FC<WordProps> = ({
  text,
  scrollY,
  layout,
  measureRef,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const setRef = (node: HTMLSpanElement | null) => {
    ref.current = node;
    measureRef?.(node);
  };

  const opacity = useTransform(scrollY, () => {
    if (typeof window === "undefined") {
      return MIN_OPACITY;
    }

    const node = ref.current;

    if (!node) {
      return MIN_OPACITY;
    }

    const rect = node.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    return getWordOpacity(centerY, window.innerHeight, layout);
  });
  const opacitySpring = useSpring(opacity, { bounce: 0, duration: 125 });
  const blur = useTransform(opacitySpring, [MIN_OPACITY, 1], [4, 0.25]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.span
      ref={setRef}
      className={styles.word}
      style={{ opacity: opacitySpring, filter }}
    >
      {text}
    </motion.span>
  );
};

const ScrollFocusParagraph: React.FC<ScrollFocusParagraphProps> = ({
  text,
  sentences,
  className,
  debug = false,
}) => {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [wordLayouts, setWordLayouts] = useState<WordLayout[]>([]);

  const sentenceList = sentences?.length ? sentences : [text ?? ""];
  const contentKey = sentenceList.join("\n");
  const tokens: Token[] = sentenceList.flatMap((sentence, sentenceIndex) => {
    const wordTokens: Token[] = sentence
      .split(/\s+/)
      .filter(isNonEmptyWord)
      .map((value) => ({ kind: "word", value }));

    if (sentenceIndex === sentenceList.length - 1) {
      return wordTokens;
    }

    return [...wordTokens, { kind: "break" }];
  });

  const { scrollY } = useScroll();
  const wordCount = tokens.filter((token) => token.kind === "word").length;

  if (wordRefs.current.length !== wordCount) {
    wordRefs.current = Array.from(
      { length: wordCount },
      (_, index) => wordRefs.current[index] ?? null,
    );
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const measureWordLayout = () => {
      const refs = wordRefs.current.slice(0, wordCount);
      const layout: WordLayout[] = Array.from(
        { length: wordCount },
        (_, index) => getFallbackLayout(index),
      );

      let currentLineIndex = -1;
      let currentLineTop = Number.NEGATIVE_INFINITY;
      const lineMeta: LineMeta[] = [];
      const wordCenterRatios = Array.from({ length: wordCount }, () => 0);
      const viewportHeight = Math.max(window.innerHeight, 1);

      refs.forEach((node, index) => {
        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();
        const top = rect.top;
        wordCenterRatios[index] = (rect.top + rect.height / 2) / viewportHeight;
        const isNextLine = currentLineIndex === -1 || top !== currentLineTop;

        if (isNextLine) {
          currentLineIndex += 1;
          currentLineTop = top;
          lineMeta[currentLineIndex] = {
            count: 0,
            firstWord: index,
            lastWord: index,
          };
        }

        const currentLine = lineMeta[currentLineIndex];
        const wordIndexInLine = currentLine.count;
        currentLine.count += 1;
        currentLine.lastWord = index;
        layout[index] = {
          lineIndex: currentLineIndex,
          wordIndexInLine,
          wordsInLine: 1,
          staggerDelay: 0,
        };
      });

      const lineStaggerDelays = lineMeta.map((line, lineIndex) => {
        if (line.count <= 1) {
          return 0;
        }

        const steps = line.count - 1;
        let leadSpan = Math.max(1 - WORD_MAP_START, 0);

        const previousLine = lineMeta[lineIndex - 1];

        if (previousLine) {
          const gapFromPreviousLine =
            wordCenterRatios[line.firstWord] -
            wordCenterRatios[previousLine.lastWord];
          const maxLeadFromGap = Math.max(gapFromPreviousLine, 0);
          leadSpan = Math.min(leadSpan, maxLeadFromGap);
        }

        return leadSpan / steps;
      });

      const normalizedLayout = layout.map((entry) => ({
        ...entry,
        wordsInLine: Math.max(lineMeta[entry.lineIndex]?.count ?? 1, 1),
        staggerDelay: lineStaggerDelays[entry.lineIndex] ?? 0,
      }));

      setWordLayouts((previous) => {
        if (isSameWordLayouts(previous, normalizedLayout)) {
          return previous;
        }

        return normalizedLayout;
      });
    };

    measureWordLayout();
    const rafId = window.requestAnimationFrame(measureWordLayout);

    const handleResize = () => measureWordLayout();
    const observer = new ResizeObserver(handleResize);

    if (paragraphRef.current) {
      observer.observe(paragraphRef.current);
    }

    wordRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    window.addEventListener("resize", handleResize);
    document.fonts?.ready.then(handleResize).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [contentKey, wordCount]);

  return (
    <motion.p
      ref={paragraphRef}
      className={`${styles.paragraph} ${className || ""}`.trim()}
    >
      {(() => {
        let wordIndex = -1;

        return tokens.map((token, tokenIndex) => {
          if (token.kind === "break") {
            return (
              <Fragment key={`break-${tokenIndex}`}>
                <br />
                <br />
              </Fragment>
            );
          }

          wordIndex += 1;
          const currentWordIndex = wordIndex;
          const nextToken = tokens[tokenIndex + 1];
          const shouldAddSpace = nextToken && nextToken.kind === "word";
          const currentLayout =
            wordLayouts[currentWordIndex] ??
            getFallbackLayout(currentWordIndex);

          return (
            <span
              key={`${token.value}-${tokenIndex}`}
              className={styles.wordWrap}
            >
              <ScrollFocusWord
                layout={currentLayout}
                measureRef={(node) => {
                  wordRefs.current[currentWordIndex] = node;
                }}
                scrollY={scrollY}
                text={token.value}
              />
              {debug ? (
                <span className={styles.debugIndex}>
                  L{currentLayout.lineIndex} W{currentLayout.wordIndexInLine}
                </span>
              ) : null}
              {shouldAddSpace ? " " : null}
            </span>
          );
        });
      })()}
    </motion.p>
  );
};

export default ScrollFocusParagraph;
