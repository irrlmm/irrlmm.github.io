import { motion } from "framer-motion";

import styles from "./styles.module.css";

import { useState } from "react";
import Svg from "../Svg";
import { SVG_BCK, SVG_FWD } from "../../consts/svg";
import AnimatedParagraph from "../AnimatedParagraph";

type Props = {};

const MotionSvg = motion.create(Svg);

const YEARS = [
  {
    year: "1997",
    title: "Designer Kid",
    lines: [
      "Since I was a kid, I've been obsessed with anything I could see or touch: sketching cars, imagining buildings, trying to make stuff.",
    ],
  },
  {
    year: "2007",
    title: "Aqua Fan",
    lines: [
      "By the time I hit middle school, touchscreens were taking over, and I was busy sketching interface designs in the margins of my notebooks.",
    ],
  },
  {
    year: "2014",
    title: "HSE University",
    lines: [
      "In university, I got serious about design and coding, and started building my first digital projects. I teamed up with friends to turn my sketches into something that actually worked.",
    ],
  },
  {
    year: "2015",
    title: "Competitions and wins",
    lines: [
      "We ended up winning a few hackathons and competitions, which gave me the confidence (and the caffeine addiction) to keep sharpening my skills.",
    ],
  },
  {
    year: "2017",
    title: "Founding Mobile Engineer @ Uniyo",
    lines: [
      "I built the mobile messenger app from the ground up. It was my first real experience, and it taught me a lot about user needs, iteration, and working across a team.",
    ],
  },
  {
    year: "2018",
    title: "UI Engineer @ iMusician",
    lines: [
      "I joined iMusician and developed UI for the complex music distribution platform, which helped thousands of artists manage every aspect of their music business.",
    ],
  },
  {
    year: "2020",
    title: "Senior Product Designer @ iMusician",
    lines: [
      "I transitioned from engineering to product design, taking the lead on designing our entire product ecosystem. I led the design and development of the platform from 0 to 1, helping turn it into a profitable SaaS business.",
    ],
  },
  {
    year: "2025",
    title: "Open to new opportunities",
    lines: [
      "I'm currently looking for new opportunities where I can apply my product design skills in high-ownership roles, especially where design drives core product decisions.",
    ],
  },
];

const ExperienceCard: React.FC<Props> = ({}) => {
  const [currentPage, setCurrentPage] = useState(YEARS.length - 2);

  const handleBackClick = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleForwardClick = () => {
    if (currentPage < YEARS.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.experienceCard}>
      <div className={styles.toolbarWrapper}>
        <motion.button
          className={styles.yearButton}
          style={{ transformOrigin: "right" }}
          whileHover="hovered"
          whileTap="pressed"
          animate={currentPage !== 0 ? "appear" : "hidden"}
          variants={{
            appear: {
              opacity: 1,
              filter: "blur(0px)",
            },
            pressed: {
              scaleX: 1.02,
            },
            hidden: {
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
          onClick={handleBackClick}
        >
          <MotionSvg
            d={SVG_BCK}
            variants={{
              hovered: {
                translateX: -2,
              },
              pressed: {
                translateX: -5,
              },
            }}
          />

          <span>
            {currentPage !== 0
              ? YEARS[currentPage - 1].year
              : YEARS[currentPage].year}
          </span>
        </motion.button>

        <h3>{YEARS[currentPage].year}</h3>

        <motion.button
          className={styles.yearButton}
          style={{ transformOrigin: "left" }}
          whileHover="hovered"
          whileTap="pressed"
          animate={currentPage !== YEARS.length - 1 ? "appear" : "hidden"}
          variants={{
            appear: {
              opacity: 1,
              filter: "blur(0px)",
            },
            pressed: {
              scaleX: 1.02,
            },
            hidden: {
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
          onClick={handleForwardClick}
        >
          <span>
            {currentPage !== YEARS.length - 1
              ? YEARS[currentPage + 1].year
              : YEARS[currentPage].year}
          </span>

          <MotionSvg
            d={SVG_FWD}
            variants={{
              hovered: {
                translateX: 2,
              },
              pressed: {
                translateX: 5,
              },
            }}
          />
        </motion.button>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <span className="font-size-m">{YEARS[currentPage].title}</span>

          <AnimatedParagraph
            key={currentPage}
            lines={YEARS[currentPage].lines}
            size="s"
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
