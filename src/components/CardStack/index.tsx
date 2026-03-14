import type { CollectionEntry } from "astro:content";
import { motion } from "framer-motion";

import {
  useElementPerspective,
  useHighlight,
  useHoverElement,
  useTilt,
} from "../../helpers/lightbox";

import { cardLightConfig, cardVariants } from "../SectionWork/const";
import styles from "./styles.module.css";

type Props = {
  item: CollectionEntry<"artifacts">;
};

const CardStack: React.FC<Props> = ({ item }) => {
  const { wrapperRef, x, y, onPointerMove, onPointerLeave } =
    useHoverElement<HTMLAnchorElement>();

  const perspective = useElementPerspective({
    elementRef: wrapperRef,
  });

  const { tiltX, tiltY } = useTilt({
    x,
    y,
    maxTilt: cardLightConfig.tilt,
  });

  const { highlightStyle, dimStyle } = useHighlight({
    x,
    y,
    intensity: cardLightConfig.lightEffectIntensity,
  });

  const containerStyle = {
    rotateX: tiltX,
    rotateY: tiltY,
  };

  const layerTransition = {
    type: "spring",
    bounce: 0,
    mass: 0.1,
  };

  return (
    <motion.a
      ref={wrapperRef}
      href={`/artifact/${item.id}`}
      className={styles.wrapper}
      style={perspective.wrapperStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      transition={layerTransition}
      variants={cardVariants}
      whileHover="hover"
    >
      <motion.div className={styles.container} style={containerStyle}>
        <motion.div className={styles.stack} transition={layerTransition}>
          <div className={styles.layer} />
          <div className={styles.layer} />
          <div className={styles.layer}>
            <motion.div className={styles.overlay} style={dimStyle} />
            <motion.div className={styles.overlay} style={highlightStyle} />
          </div>
        </motion.div>

        <div className={styles.panel}>
          <h3 className="overline text-xs">{item.data.title}</h3>
        </div>
      </motion.div>
    </motion.a>
  );
};

export default CardStack;
