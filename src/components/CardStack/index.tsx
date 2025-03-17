// src/components/CardStack.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import "./style.css";

const Card = ({
  card,
  isActive,
  onSwipe,
}: {
  card: any;
  isActive: boolean;
  onSwipe: () => void;
}) => {
  const controls = useAnimation();

  const rotate = Math.random() * -15 + 7;

  const variants = {
    idle: {
      x: 0,
      opacity: 1,
      scale: 0.98,
      rotate,
      border: "solid 1px var(--outline)",
      filter: "blur(3.5px)",
    },
    active: {
      opacity: 1,
      scale: 1,
      rotate: rotate / 2,
      border: "solid 1px var(--outline)",
      filter: "blur(0.0px)",
    },
    focus: {
      scale: 1.02,
      opacity: 1,
      rotate: rotate / 3,
      filter: "blur(0.0px)",
      border: "solid 1px var(--accent)",
    },
    swipeR: {
      x: 500,
      opacity: 0,
      filter: "blur(0.0px)",
    },
    swipeL: {
      x: -500,
      opacity: 0,
      filter: "blur(0.0px)",
    },
  };

  useEffect(() => {
    controls.set(isActive ? "active" : "idle");
  }, []);

  useEffect(() => {
    controls.start(isActive ? "active" : "idle");
  }, [isActive]);

  const [isConstrained, setIsConstrained] = useState(true);

  const v = useRef(0);
  const x = useMotionValue(0);

  const onDrag = () => {
    v.current = x.getVelocity();
  };

  const onDragEnd = () => {
    if (Math.abs(v.current) > 200 || Math.abs(x.get()) > 200) {
      setIsConstrained(false);
      controls
        .start(
          Math.abs(v.current) > 200
            ? v.current > 0
              ? "swipeR"
              : "swipeL"
            : x.get() > 0
            ? "swipeR"
            : "swipeL"
        )
        .finally(() => {
          setIsConstrained(true);
          controls.set("idle");
          onSwipe();
        });
    }
  };

  const handleStartFocus = () => {
    controls.start(isActive ? "focus" : "idle");
  };

  const handleEndFocus = () => {
    controls.start(isActive ? "active" : "idle");
  };

  return (
    <motion.div
      className="identity-card col"
      animate={controls}
      variants={variants}
      drag={isActive && "x"}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      dragConstraints={
        isConstrained && { left: 0, right: 0, top: 0, bottom: 0 }
      }
      dragElastic={1}
      onDragStart={handleStartFocus}
      onHoverStart={handleStartFocus}
      onDragExit={handleEndFocus}
      onHoverEnd={handleEndFocus}
      style={{ x }}
      transition={{ duration: 0.25 }}
    >
      <div className="col flex-1 justify-between padding-32">
        <div className="row gap-16 align-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--on-surface)"
            strokeWidth={1.5}
          >
            <path d={card.icon} vector-effect="non-scaling-stroke"></path>
          </svg>
          <h3>{card.title}</h3>
        </div>

        <div className="col gap-8">
          <h1>{card.values[0]}</h1>
          {card.values.map((v: any) => (
            <span>{v}</span>
          ))}
        </div>

        <p className="body-s color-secondary">{card.description}</p>
      </div>
    </motion.div>
  );
};

const CardStack = ({ cards }: { cards: any[] }) => {
  const [cardsShown, setCardsShown] = useState(cards);

  function handleSwipe() {
    setCardsShown([
      cardsShown[cardsShown.length - 1],
      ...cardsShown.slice(0, -1),
    ]);
  }

  return (
    <div className="card-stack-container">
      {cardsShown.map((card, i) => (
        <Card
          key={card.id}
          card={card}
          isActive={i === cardsShown.length - 1}
          onSwipe={handleSwipe}
        />
      ))}

      <span className="body-s color-secondary">{"< Swipe / Drag >"}</span>
    </div>
  );
};

export default CardStack;
