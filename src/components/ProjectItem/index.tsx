import { Fragment, useRef } from "react";
import { useScroll, motion } from "framer-motion";

import AnimatedLinkButton from "../AnimatedLinkButton";
import ShakingCardsGallery from "../ShakingCardsGallery";

import styles from "./styles.module.css";

type Props = {
  title: string;
  timeline?: string;
  lines: string[];
  link?: UI.Link;
  content: { imgSrc: string; chip?: string; logo?: string }[];
};

const ProjectItem: React.FC<Props> = ({
  title,
  timeline,
  lines,
  link,
  content,
}) => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end center"],
  });

  return (
    <div ref={target} className={styles.project}>
      <div className={styles.infoCol}>
        <div className="col gap-l">
          <div className={styles.progressWrapper}>
            <motion.div
              className={styles.progress}
              style={{ scaleX: scrollYProgress }}
            />
          </div>

          <div className="col gap-2xs align-start">
            {timeline && <span className={styles.timeline}>{timeline}</span>}

            <h3>{title}</h3>
          </div>

          <div className="col gap-s color-secondary">
            {lines.map((l, i) => (
              <p key={`line-${i}`} className={styles.text}>
                {l}
              </p>
            ))}
          </div>
        </div>

        {link && (
          <AnimatedLinkButton
            label={link.label}
            href={link.href}
            external={link.external}
          />
        )}
      </div>

      <ShakingCardsGallery content={content} cardClassName={styles.jumboCard} />
    </div>
  );
};

export default ProjectItem;
