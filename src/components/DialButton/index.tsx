import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { pew } from "../../helpers/motion";
import styles from "./styles.module.css";

type SlotRenderCtx = {
  slotIndex: number;
  slotAngle: number;
  dialRotate: number;
  isActive: boolean;
  hovered: boolean;
};

type Props = {
  slotCount: number;
  activeSlot: number;
  onStep: () => void;
  ariaLabel: string;
  children: (ctx: SlotRenderCtx) => ReactNode;
  isActiveSlot?: (slotIndex: number) => boolean;
};

const DialButton = ({
  slotCount,
  activeSlot,
  onStep,
  ariaLabel,
  children,
  isActiveSlot,
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const showDelayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slotStep = 360 / slotCount;
  const dialRotate = -activeSlot * slotStep;

  useEffect(
    () => () => {
      if (showDelayTimeoutRef.current)
        clearTimeout(showDelayTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    },
    [],
  );

  const triggerTouchHoverPulse = () => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none)").matches) return;

    if (showDelayTimeoutRef.current) clearTimeout(showDelayTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    // On touch devices, emulate hover shortly after press.
    showDelayTimeoutRef.current = setTimeout(() => {
      setHovered(true);
      hideTimeoutRef.current = setTimeout(() => setHovered(false), 700);
    }, 120);
  };

  const handleClick = () => {
    onStep();
    triggerTouchHoverPulse();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={styles.button}
      aria-label={ariaLabel}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className={styles.dial}
        initial={false}
        animate={{ rotate: dialRotate }}
        transition={pew(0.15)}
      >
        {Array.from({ length: slotCount }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.spoke}
            style={{ transform: `translateY(-50%) rotate(${i * slotStep}deg)` }}
            initial={false}
          >
            {children({
              slotIndex: i,
              slotAngle: i * slotStep,
              dialRotate,
              isActive: isActiveSlot ? isActiveSlot(i) : i === activeSlot,
              hovered,
            })}
          </motion.div>
        ))}
      </motion.div>

      <motion.span
        className={styles.dot}
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
      />
    </motion.button>
  );
};

export default DialButton;
