import React from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { SPRING_CONFIG } from "../../helpers/motion";
import { useStackedImageLightShadowTransforms } from "../../helpers/stackedImageLightShadow";

export type StackedImageProps = {
  srcs: string[];
  tilt?: number;
  caption?: string;
  stackDepth?: number;
  maxWidth?: React.CSSProperties["maxWidth"];
  aspectRatio?: React.CSSProperties["aspectRatio"];
};

type DepthLayer = {
  key: string;
  src: string;
  zIndex: number;
  z: number;
};

const depthVariants = (z: number) => ({
  idle: { z: 0 },
  hover: { z },
});

const StackedImage: React.FC<StackedImageProps> = ({
  srcs,
  aspectRatio = "16/10",
  maxWidth,
  tilt,
  stackDepth = 0.1,
  caption,
}) => {
  const [baseSrc, ...depthSrcs] = srcs;

  if (!baseSrc) {
    return null;
  }

  const {
    wrapperRef,
    wrapperStyle,
    elementPerspective,
    containerStyle,
    highlightStyle,
    shadowStyle,
    handlePointerMove,
    handlePointerLeave,
  } = useStackedImageLightShadowTransforms({
    tilt,
  });

  const totalDepthPx = stackDepth * elementPerspective;
  const layers: DepthLayer[] = [
    { key: "base", src: baseSrc, zIndex: 0, z: 0 },
    ...depthSrcs.map((src, index) => ({
      key: `layer-${index + 2}`,
      src,
      zIndex: index + 1,
      z: totalDepthPx * ((index + 1) / depthSrcs.length),
    })),
  ];

  return (
    <div
      className={`ui ${styles.column}`}
      style={{ maxWidth: maxWidth || "64rem" }}
    >
      <motion.div
        ref={wrapperRef}
        className={styles.wrapper}
        style={wrapperStyle}
        initial="idle"
        whileHover="hover"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          className={styles.container}
          role="img"
          style={{
            aspectRatio,
            ...containerStyle,
            boxShadow: "none",
          }}
        >
          {layers.map(({ key, src, zIndex, z }) => (
            <motion.div
              key={key}
              className={styles.imageLayer}
              aria-hidden="true"
              style={{
                zIndex,
                backgroundImage: `url("${src}")`,
              }}
              variants={depthVariants(z)}
              transition={SPRING_CONFIG}
            />
          ))}

          {/* Dark overlay */}
          <motion.div className={styles.overlay} style={shadowStyle} />
          <motion.div className={styles.overlay} style={highlightStyle} />
        </motion.div>
      </motion.div>

      {caption && <p>{caption}</p>}
    </div>
  );
};

export default StackedImage;
