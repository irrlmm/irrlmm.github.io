import { motion } from "framer-motion";

import {
  useElementPerspective,
  useGloom,
  useHighlight,
  useHoverElement,
  useParallax,
  useTilt,
} from "../../../helpers/lightbox";
import SvgMaskImage from "../../SvgMaskImage";

import { cardLightConfig, p, variants, wrapperVariants } from "../const";
import type { WorkWithOrg } from "../types";
import styles from "./styles.module.css";

type Props = {
  item: WorkWithOrg;
};

const CardWork: React.FC<Props> = ({ item }) => {
  const { x, y, hoverElementRef, onPointerMove, onPointerLeave } =
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

  // const imageClipPath = getCardClipPath(`${item.id}:work`);

  return (
    <motion.div
      className={styles.wrapper}
      style={perspective.wrapperStyle}
      variants={wrapperVariants}
    >
      <motion.a
        href={`/work/${item.id}`}
        className={styles.container}
        ref={hoverElementRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
        }}
        variants={variants}
        initial="hidden"
        animate="default"
        whileHover="hover"
      >
        <motion.div
          className={styles.image}
          style={{
            backgroundImage: `url(${item.data.coverImage})`,
            // clipPath: imageClipPath,
            ...imageGloom,
            ...parallaxStyles,
          }}
        ></motion.div>

        <div className="row align-center justify-between">
          <SvgMaskImage
            className={styles.orgLogo}
            src={item.data.orgImage}
            aspectRatio={item.data.orgImageAspect}
          />

          <span className="overline text-xs">{item.data.orgName}</span>
        </div>

        <h3 className="overline text-s">{item.data.title}</h3>

        <div className="row gap-2 justify-between">
          <span className="overline text-xs">{item.data.tag}</span>

          <span className="overline text-xs">
            {item.data.date.getFullYear()}
          </span>
        </div>

        <motion.div className={styles.overlay} style={dimStyle} />
        <motion.div className={styles.overlay} style={highlightStyle} />
      </motion.a>
    </motion.div>
  );
};

export default CardWork;
