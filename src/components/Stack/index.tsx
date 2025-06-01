import { motion } from "framer-motion";

import Card from "../Card";

import styles from "./styles.module.css";
import CaseStudyContent from "../IntroStack/components/CaseStudyContent";
import ProductEyeContent from "../IntroStack/components/ProductEyeContent";
import PunchlineContent from "../IntroStack/components/PunchlineContent";

type Props = {
  src: string;
};

const Stack: React.FC<Props> = ({ src }) => {
  const items: React.JSX.Element[] = [
    <div
      className={styles.introWrapper}
      style={{ backgroundImage: `url(${src})` }}
    >
      <p>Hi! I'm Igor.</p>
      <p>
        I'm a senior product designer <br />
        with experience in dev.
      </p>
    </div>,
    // <div className={styles.introWrapper}>
    //   <CaseStudyContent
    //     card={{
    //       type: "case-study",
    //       id: "dsd",
    //       title: "AI Mastering Tool",
    //       link: {
    //         label: "Case study",
    //         href: "/work/imusician-ai-mastering-tool",
    //       },
    //     }}
    //   />
    // </div>,
    // <div className={styles.introWrapper}>
    //   <ProductEyeContent
    //     card={{
    //       type: "product-eye",
    //       id: "ds",
    //       text: "Text",
    //       title: "Analytics",
    //     }}
    //   />
    // </div>,
    <div className={styles.punchlineWrapper}>
      <PunchlineContent
        card={{
          id: "punchline",
          type: "facts",
          title: "Daily Wisdom",
          lines: [
            "2017: Started as Founding Mobile Engineer",
            "2018: Moved to web UI Engineering",
            "2020: Stepped up as Senior Product Designer",
            "Learned how to scale SaaS with just one pair of hands",
            "Future goals: grow into C-level builder and work on innovative products for broader audiences",
          ],
        }}
      />
    </div>,
    // <>Ssaka</>,
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
        <Card key={index} content={item} />
      ))}
    </motion.div>
  );
};

export default Stack;
