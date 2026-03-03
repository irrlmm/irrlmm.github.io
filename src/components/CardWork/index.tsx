import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";

import getAverageImageColor from "../../helpers/getAverageImageColor";
import { useStackedImageLightShadowTransforms } from "../../helpers/stackedImageLightShadow";

import styles from "./styles.module.css";

type Props = {
  item: CollectionEntry<"work"> & {
    data: CollectionEntry<"work">["data"] & {
      orgImage: string;
      orgName: string;
      coverImageColor: string;
    };
  };
};

const WorkItem: React.FC<Props> = ({ item }) => {
  const [coverShadowColor, setCoverShadowColor] = useState(
    item.data.coverImageColor,
  );

  useEffect(() => {
    let isCancelled = false;

    const loadColor = async () => {
      const averageColor = await getAverageImageColor(item.data.coverImage);
      if (!isCancelled) {
        setCoverShadowColor(averageColor);
      }
    };

    loadColor();

    return () => {
      isCancelled = true;
    };
  }, [item.data.coverImage]);

  const {
    wrapperRef,
    wrapperStyle,
    containerStyle,
    highlightStyle,
    shadowStyle,
    handlePointerMove,
    handlePointerLeave,
  } = useStackedImageLightShadowTransforms<HTMLAnchorElement>({
    mixShadowColor: coverShadowColor,
    lightEffectIntensity: 0.8,
  });

  const layerVariants = {
    idle: { translateZ: 0 },
    hover: {
      translateZ: wrapperStyle.perspective / 30,
    },
  };

  const layerTransition = {
    type: "spring",
    bounce: 0,
    mass: 0.1,
  };

  return (
    <motion.a
      ref={wrapperRef}
      href={`/work/${item.id}`}
      className={styles.wrapper}
      style={wrapperStyle}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      variants={{ hover: { scale: 1.025 }, tap: { scale: 0.975 } }}
      transition={layerTransition}
    >
      <motion.div
        className={styles.container}
        style={{
          ...containerStyle,
          backgroundImage: `url(${item.data.coverImage})`,
        }}
      >
        <motion.div
          className={styles.content}
          transition={layerTransition}
          variants={layerVariants}
        >
          <motion.div
            className={styles.orgLogo}
            style={{ backgroundImage: `url(${item.data.orgImage})` }}
          />

          <motion.div className={styles.item} variants={layerVariants}>
            <span className="overline-xs">{item.data.orgName}</span>

            <h3 className="overline-s">{item.data.title}</h3>

            <span className="overline-xs">
              {moment(item.data.date).toNow(true)} ago
            </span>
          </motion.div>
        </motion.div>

        <motion.div className={styles.overlay} style={shadowStyle} />
        <motion.div className={styles.overlay} style={highlightStyle} />
      </motion.div>
    </motion.a>
  );
};

export default WorkItem;
