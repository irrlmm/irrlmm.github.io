import { useEffect, useState, type RefObject } from "react";

const DEFAULT_PERSPECTIVE = 1600;
const PERSPECTIVE_MULTIPLIER = 2;

type UseElementPerspectiveInput<T extends HTMLElement> = {
  elementRef: RefObject<T | null>;
};

export const useElementPerspective = <T extends HTMLElement>({
  elementRef,
}: UseElementPerspectiveInput<T>) => {
  const [elementPerspective, setElementPerspective] = useState(DEFAULT_PERSPECTIVE);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updatePerspective = () => {
      const rect = element.getBoundingClientRect();
      const nextPerspective = Math.max(rect.width, rect.height);
      setElementPerspective(
        nextPerspective > 0 ? nextPerspective : DEFAULT_PERSPECTIVE,
      );
    };

    updatePerspective();

    const observer = new ResizeObserver(updatePerspective);
    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef]);

  return {
    elementPerspective,
    wrapperStyle: {
      perspective: elementPerspective * PERSPECTIVE_MULTIPLIER,
    },
  };
};
