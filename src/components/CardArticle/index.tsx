import type { CollectionEntry } from "astro:content";
import { motion } from "framer-motion";
import moment from "moment";

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

const CardArticle: React.FC<Props> = ({ item }) => {
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
        <motion.div
          className={`${styles.content} col justify-start`}
          transition={layerTransition}
        >
          <div className={styles.contentHeader} />

          <svg className={styles.dashedLine}>
            <line x1={0} y1={0} x2="100%" y2={0} stroke="var(--outline)" />
          </svg>

          <h3 className="overline text-s">{item.data.title}</h3>
        </motion.div>

        <motion.div className={styles.overlay} style={dimStyle} />
        <motion.div className={styles.overlay} style={highlightStyle} />

        <span className="overline text-xs">
          {moment(item.data.date).toNow(true)} ago
        </span>
      </motion.div>
    </motion.a>
  );
};

export default CardArticle;
