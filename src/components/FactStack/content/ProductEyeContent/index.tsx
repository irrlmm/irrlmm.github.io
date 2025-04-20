import type { Fact } from "../../../../consts/facts";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import BlackMirror from "./BlackMirror";

import styles from "./styles.module.css";

type Props = {
  index?: number;
  card: Fact;
  trackMeta?: any;
};

const ProductEyeContent: React.FC<Props> = ({ index, card, trackMeta }) => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (index === 0) {
      interval = setInterval(() => {
        setTimeSpent(Date.now() - trackMeta.cardTimestamp);
      }, 125); // update every half second
    }

    return () => {
      clearInterval(interval);
    };
  }, [index, trackMeta]);

  const timeElapsed = Number((timeSpent / 1000).toFixed(2));

  const eventDetails = [
    { label: "stack_started", value: trackMeta.started.toString() },
    // { label: "completed_halfway", value: trackMeta.passedHalfway.toString() },
    { label: "times_completed", value: trackMeta.completeCount.toString() },
    {
      label: "card_time",
      value: `${timeElapsed > 10 ? "> 10" : timeElapsed}s`,
    },
  ];

  return (
    <div className={styles.productEyeCard}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={styles.cornerDecor} />
      ))}

      <BlackMirror
        pixelBlocks={4}
        noiseFps={2}
        amplitude={0.1}
        className={styles.blackMirror}
      />

      <div className="col gap-s">
        <div className={styles.header}>
          <h2 className="flex-1">{card.payload.title}</h2>

          <motion.div
            className={styles.rec}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </div>

        <p className={styles.text}>{card.payload.text}</p>
      </div>

      {trackMeta && (
        <ul className="col gap-xs">
          {eventDetails.map(({ label, value }) => (
            <li key={label} className="row gap-xs">
              <span className="flex-1">{label}</span>
              <span className="flex-1">{value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductEyeContent;
