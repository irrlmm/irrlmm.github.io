import { Fragment, useRef } from "react";
import { useScroll, motion } from "framer-motion";

import JumboProjectCard from "../JumboProjectCard";

import styles from "./styles.module.css";
import AnimatedLinkButton from "../AnimatedLinkButton";

type Props = {
  title: string;
  timeline?: string;
  chips?: string[];
  lines: string[];
  link?: UI.Link;
  imgSrcs: { src: string }[];
};

const ProjectItem: React.FC<Props> = ({
  title,
  timeline,
  lines,
  chips,
  link,
  imgSrcs,
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

          <div className="col gap-s">
            {lines.map((l, i) => (
              <Fragment key={`line-${i}`}>
                <p className={styles.text}>{l}</p>

                {i !== lines.length - 1}
              </Fragment>
            ))}
          </div>

          {chips && (
            <div className={styles.chipsWrapper}>
              {chips.map((c) => (
                <span className={styles.chip}>{c}</span>
              ))}
            </div>
          )}
        </div>

        {link && (
          <AnimatedLinkButton
            label={link.label}
            href={link.href}
            external={link.external}
          />
        )}
      </div>

      <div className={styles.cardsCol}>
        {imgSrcs.map(({ src }, i) => (
          <JumboProjectCard
            key={src}
            src={src}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectItem;
