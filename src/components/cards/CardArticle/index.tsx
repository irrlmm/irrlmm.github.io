import type { CollectionEntry } from "astro:content";
import { motion } from "framer-motion";
import moment from "moment";

import {
  useElementPerspective,
  useHighlight,
  useHoverElement,
  useTilt,
} from "../../../helpers/lightbox";

import { cardLightConfig, p, variants, wrapperVariants } from "../const";
import styles from "./styles.module.css";

type Props = {
  item: CollectionEntry<"artifacts">;
};

const CardArticle: React.FC<Props> = ({ item }) => {
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

  const { highlightStyle, dimStyle } = useHighlight({
    x,
    y,
    intensity: cardLightConfig.lightEffectIntensity,
  });

  const containerStyle = {
    rotateX: tiltX,
    rotateY: tiltY,
  };

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
        <motion.div className={`${styles.content} col justify-start`}>
          {/* <div className={styles.contentHeader} />

          <svg className={styles.dashedLine}>
            <line x1={0} y1={0} x2="100%" y2={0} stroke="var(--outline)" />
          </svg> */}

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
