import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { SPRING_CONFIG } from "../motion";

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
  initialXY?: [number, number];
  resetsToCenter?: boolean;
  spring?: any;
};

export const useHoverElement = <T extends HTMLElement = HTMLDivElement>({
  initialXY,
  resetsToCenter = false,
  spring,
}: UseHoverElementInput = {}) => {
  const initialTargetRef = useRef<[number, number] | null>(null);
  if (!initialTargetRef.current) {
    const [startX, startY] = resetsToCenter
      ? [0, 0]
      : (initialXY ?? [getRandomCentered(), getRandomCentered()]);
    initialTargetRef.current = [
      clampToCentered(startX),
      clampToCentered(startY),
    ];
  }

  const wrapperRef = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);

  const intX = useMotionValue(0);
  const intY = useMotionValue(0);

  const x = useSpring(intX, spring || SPRING_CONFIG);
  const y = useSpring(intY, spring || SPRING_CONFIG);

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
    intX.set(0);
    intY.set(0);
  };

  const onPointerMove = (event: PointerEvent<T>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width;
    const normalizedY = (event.clientY - rect.top) / rect.height;
    setHoverFromNormalized(normalizedX, normalizedY);
  };

  const onPointerLeave = () => {
    if (resetsToCenter) {
      resetHover();
      return;
    }
    setIsHovered(false);
  };

  return {
    wrapperRef,
    x,
    y,
    isHovered,
    onPointerMove,
    onPointerLeave,
  };
};
