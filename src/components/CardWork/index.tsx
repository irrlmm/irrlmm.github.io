import type { CollectionEntry } from "astro:content";
import { motion } from "framer-motion";

import {
  useElementPerspective,
  useGloom,
  useHighlight,
  useHoverElement,
  useParallax,
  useTilt,
} from "../../helpers/lightbox";

import type { ImageColors } from "../../helpers/getAverageImageColorServer";
import { SPRING_CONFIG } from "../../helpers/motion";
import { cardLightConfig, cardVariants } from "../SectionWork/const";
import styles from "./styles.module.css";

type Props = {
  item: CollectionEntry<"work"> & {
    data: CollectionEntry<"work">["data"] & {
      orgImage: string;
      orgName: string;
      colors: ImageColors;
    };
  };
};

const CardWork: React.FC<Props> = ({ item }) => {
  const { x, y, wrapperRef, onPointerMove, onPointerLeave } =
    useHoverElement<HTMLAnchorElement>();

  const perspective = useElementPerspective({
    elementRef: wrapperRef,
  });

  const { tiltX, tiltY } = useTilt({
    x,
    y,
    maxTilt: cardLightConfig.tilt,
  });

  const parallaxStyles = useParallax({ x, y });

  const { highlightIntensity, highlightStyle, dimStyle } = useHighlight({
    x,
    y,
    intensity: cardLightConfig.lightEffectIntensity,
  });

  const imageGloom = useGloom({
    x,
    y,
    highlightIntensity,
    gloomColor: item.data.colors.gloom,
    shadowColor: item.data.colors.shadow,
  });

  return (
    <motion.a
      ref={wrapperRef}
      href={`/work/${item.id}`}
      className={styles.wrapper}
      style={{
        ...perspective.wrapperStyle,
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      transition={SPRING_CONFIG}
      whileHover="hover"
      variants={cardVariants}
    >
      <motion.div
        className={styles.container}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
        }}
      >
        <motion.div
          className={styles.image}
          style={{
            backgroundImage: `url(${item.data.coverImage})`,
            ...imageGloom,
            ...parallaxStyles,
          }}
        ></motion.div>

        <div className="row align-center justify-between">
          <motion.div
            className={styles.orgLogo}
            style={{
              backgroundImage: `url(${item.data.orgImage})`,
            }}
          />

          <span className="overline text-xs">{item.data.orgName}</span>
        </div>

        <h3 className="overline text-s">{item.data.title}</h3>

        <div className="row gap-s justify-between">
          <span className="overline text-xs">{item.data.tag}</span>

          <span className="overline text-xs">
            {item.data.date.getFullYear()}
          </span>
        </div>

        <motion.div className={styles.overlay} style={dimStyle} />
        <motion.div className={styles.overlay} style={highlightStyle} />
      </motion.div>
    </motion.a>
  );
};

export default CardWork;
