import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { pew } from "../motion";

const NORMALIZED_MIN = 0;
const NORMALIZED_MAX = 1;
const CENTERED_MIN = -1;
const CENTERED_MAX = 1;

const clampToNormalized = (value: number) =>
  Math.min(NORMALIZED_MAX, Math.max(NORMALIZED_MIN, value));

const clampToCentered = (value: number) =>
  Math.min(CENTERED_MAX, Math.max(CENTERED_MIN, value));

const normalizedToCentered = (value: number) =>
  clampToNormalized(value) * 2 - 1;

const getRandomCentered = () => Math.random() * 2 - 1;

type UseHoverElementInput = {
  initialTilt?: [number, number];
  resetsToInitial?: boolean;
  pew?: number;
};

export const useHoverElement = <T extends HTMLElement = HTMLDivElement>({
  initialTilt,
  resetsToInitial = false,
  pew: p,
}: UseHoverElementInput = {}) => {
  const initialTargetRef = useRef<[number, number] | null>(null);

  if (!initialTargetRef.current) {
    const [startX, startY] = initialTilt ?? [
      getRandomCentered(),
      getRandomCentered(),
    ];

    initialTargetRef.current = [
      clampToCentered(startX),
      clampToCentered(startY),
    ];
  }

  const hoverElementRef = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);

  const intX = useMotionValue(0);
  const intY = useMotionValue(0);

  const x = useSpring(intX, pew(p));
  const y = useSpring(intY, pew(p));

  useEffect(() => {
    const [initialX, initialY] = initialTargetRef.current ?? [0, 0];
    intX.set(initialX);
    intY.set(initialY);
    x.set(initialX);
    y.set(initialY);
  }, [intX, intY]);

  const setHoverFromCentered = (nextX: number, nextY: number) => {
    setIsHovered(true);
    intX.set(clampToCentered(nextX));
    intY.set(clampToCentered(nextY));
  };

  const setHoverFromNormalized = (normalizedX: number, normalizedY: number) => {
    setHoverFromCentered(
      normalizedToCentered(normalizedX),
      normalizedToCentered(normalizedY),
    );
  };

  const resetHover = () => {
    setIsHovered(false);
    const [initialX, initialY] = initialTargetRef.current ?? [0, 0];
    intX.set(initialX);
    intY.set(initialY);
  };

  const onPointerMove = (event: PointerEvent<T>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width;
    const normalizedY = (event.clientY - rect.top) / rect.height;
    setHoverFromNormalized(normalizedX, normalizedY);
  };

  const onPointerLeave = () => {
    if (resetsToInitial) {
      resetHover();
      return;
    }
    setIsHovered(false);
  };

  return {
    hoverElementRef,
    x,
    y,
    isHovered,
    onPointerMove,
    onPointerLeave,
  };
};
