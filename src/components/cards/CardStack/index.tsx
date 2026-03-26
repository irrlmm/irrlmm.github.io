import { motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

import {
  useElementPerspective,
  useGloom,
  useHighlight,
  useHoverElement,
  useParallax,
  useTilt,
} from "../../../helpers/lightbox";

import { cardLightConfig, p, variants, wrapperVariants } from "../const";

import type { ArtifactStack } from "../types";

import styles from "./styles.module.css";

type Props = {
  item: ArtifactStack;
};

const getSnappedDepth = (
  layerIndex: number,
  activeIndex: number,
  layerCount: number,
) => {
  const distance = Math.abs(layerIndex - activeIndex);
  const maxDistance = Math.max(activeIndex, layerCount - 1 - activeIndex);
  const depthStep = 1;

  return (maxDistance - distance) * depthStep;
};

const CardStack: React.FC<Props> = ({ item }) => {
  const { hoverElementRef, x, y, onPointerMove, onPointerLeave } =
    useHoverElement<HTMLAnchorElement>({
      pew: p,
    });

  const perspective = useElementPerspective({
    elementRef: hoverElementRef,
  });

  const { tiltX, tiltY } = useTilt({
    x,
    y,
    maxTilt: cardLightConfig.tilt,
  });

  const { highlightIntensity, dimStyle, highlightStyle } = useHighlight({
    x,
    y,
    intensity: cardLightConfig.lightEffectIntensity,
  });

  const containerStyle = {
    rotateX: tiltX,
    rotateY: tiltY,
  };

  const parallaxStyle = useParallax({ x, y });

  const fallbackLayerCount = 3;
  const layers = item.data.images?.length
    ? item.data.images
    : Array.from({ length: fallbackLayerCount }, () => undefined);

  const [activeLayerIndex, setActiveLayerIndex] = useState(
    Math.floor(layers.length / 2),
  );

  const minSpreadPercent = 10;
  const maxSpreadPercent = 20;
  const minRotateDeg = 5;
  const maxRotateDeg = 8;
  const fallbackGloomColor = "#fff";
  const fallbackShadowColor = "#111";

  useMotionValueEvent(x, "change", (latestX) => {
    const normalizedX = Math.max(0, Math.min(1, (latestX + 1) / 2));
    const nextIndex = Math.min(
      layers.length - 1,
      Math.floor(normalizedX * layers.length),
    );
    setActiveLayerIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  return (
    <motion.a
      ref={hoverElementRef}
      href={`/artifact/${item.id}`}
      className={styles.wrapper}
      style={perspective.wrapperStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      variants={wrapperVariants}
    >
      <motion.div
        className={styles.container}
        style={containerStyle}
        variants={variants}
        initial="hidden"
        animate="default"
        whileHover="hover"
      >
        <motion.div className={styles.stack}>
          {layers.map((layer, i) => {
            const ratio = layers.length > 1 ? i / (layers.length - 1) : 0.5;

            const spreadXIdle = `${-minSpreadPercent + ratio * minSpreadPercent * 2}%`;
            const spreadXHover = `${-maxSpreadPercent + ratio * maxSpreadPercent * 2}%`;

            const depthRem = getSnappedDepth(
              i,
              activeLayerIndex,
              layers.length,
            );

            const rotateDegIdle = (ratio - 0.5) * 2 * minRotateDeg;
            const rotateDegHover = (ratio - 0.5) * 2 * maxRotateDeg;

            const imageColors = layer?.imageColors;

            const layerVariants = {
              hidden: { x: 0, rotate: 0, z: `${depthRem}rem` },
              default: {
                x: spreadXIdle,
                rotate: rotateDegIdle,
                z: `${depthRem}rem`,
              },
              hover: {
                x: spreadXHover,
                rotate: rotateDegHover,
              },
            };

            const imageGloom = useGloom({
              x,
              y,
              highlightIntensity,
              gloomColor: imageColors?.gloom ?? fallbackGloomColor,
              shadowColor: imageColors?.shadow ?? fallbackShadowColor,
            });

            return (
              <motion.div className={styles.layer} variants={layerVariants}>
                {layer && (
                  <motion.div
                    className={styles.imageOverlay}
                    style={{
                      backgroundImage: `url(${layer.src})`,
                      ...parallaxStyle,
                      ...imageGloom,
                    }}
                  />
                )}
                <motion.div className={styles.overlay} style={highlightStyle} />
                <motion.div className={styles.overlay} style={dimStyle} />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.a>
  );
};

export default CardStack;
