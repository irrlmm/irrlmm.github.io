import { motion } from "framer-motion";
import React from "react";
import {
  useElementPerspective,
  useHighlight,
  useHoverElement,
  useTilt,
} from "../../helpers/lightbox";
import { pew } from "../../helpers/motion";
import styles from "./styles.module.css";

export type StackedImageProps = {
  srcs: string[];
  tilt?: number;
  caption?: string;
  stackDepth?: number;
  immediateStack?: boolean;
  maxWidth?: React.CSSProperties["maxWidth"];
  aspectRatio?: React.CSSProperties["aspectRatio"];
};

type DepthLayer = {
  key: string;
  src: string;
  zIndex: number;
  z: number;
};

const StackedImage: React.FC<StackedImageProps> = ({
  srcs,
  aspectRatio = "16/10",
  maxWidth = "64rem",
  tilt = 7.5,
  stackDepth = 0.1,
  caption,
}) => {
  const [baseSrc, ...depthSrcs] = srcs;

  if (!baseSrc) {
    return null;
  }

  const { hoverElementRef, x, y, onPointerMove, onPointerLeave, isHovered } =
    useHoverElement({
      // initialTilt: [0, 0],
      // resetsToInitial: true,
    });

  const { tiltX, tiltY } = useTilt({
    x,
    y,
    maxTilt: tilt,
  });

  const { elementPerspective, wrapperStyle } = useElementPerspective({
    elementRef: hoverElementRef,
  });

  const { highlightStyle, dimStyle } = useHighlight({
    x,
    y,
    intensity: 0.5,
  });

  const containerStyle = {
    rotateX: tiltX,
    rotateY: tiltY,
  };

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
    <div className={`ui-image ${styles.column}`} style={{ maxWidth }}>
      <motion.div
        ref={hoverElementRef}
        className={styles.wrapper}
        style={wrapperStyle}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
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
                z,
                zIndex,
                backgroundImage: `url("${src}")`,
              }}
              transition={pew(0.3)}
            />
          ))}

          <div className={styles.outline} />

          <motion.div className={styles.overlay} style={dimStyle} />
          <motion.div className={styles.overlay} style={highlightStyle} />
        </motion.div>
      </motion.div>

      {caption && <p>{caption}</p>}
    </div>
  );
};

export default StackedImage;
