import { motion } from "framer-motion";

import Card from "../Card";

import styles from "./styles.module.css";
import CaseStudyContent from "../IntroStack/components/CaseStudyContent";

type Props = {
  src: string;
};

const Stack: React.FC<Props> = ({ src }) => {
  const items: { content: React.JSX.Element; rotation: number }[] = [
    {
      content: (
        <div
          className={styles.introWrapper}
          style={{ backgroundImage: `url(${src})` }}
        >
          <p>Hi! I'm Igor.</p>
          <p>
            I'm a product designer <br />
            and software developer.
          </p>
        </div>
      ),
      rotation: 0.25,
    },
    {
      content: (
        <div className={styles.introWrapper}>
          <CaseStudyContent
            card={{
              type: "case-study",
              id: "dsd",
              title: "AI Mastering Tool",
              link: {
                label: "Case study",
                href: "/work/imusician-ai-mastering-tool",
              },
            }}
          />
        </div>
      ),
      rotation: 3,
    },
    { content: <>Ssaka</>, rotation: 4 },
    { content: <>Ssaka</>, rotation: -2 },
    { content: <>Ssaka</>, rotation: 1 },
  ];

  return (
    <motion.div
      className={styles.stack}
      variants={{
        hidden: {},
        shown: { transition: { delayChildren: 0.5, staggerChildren: 0.075 } },
      }}
      initial="hidden"
      animate="shown"
    >
      {items.map((item, index) => (
        <Card
          key={index}
          index={index}
          zIndex={items.length - 1 - index}
          rotation={item.rotation}
          content={item.content}
        />
      ))}
    </motion.div>
  );
};

export default Stack;
