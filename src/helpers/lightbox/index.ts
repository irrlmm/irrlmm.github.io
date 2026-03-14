export type LightningEffectInput = {
  tilt?: number;
  lightPoint?: [number, number];
  gloomColor?: string;
  lightEffectIntensity?: number;
  gloomIntensity?: number;
};

export { useElementPerspective } from "./useElementPerspective";
export { useGloom } from "./useGloom";
export { useHighlight } from "./useHighlight";
export { useHoverElement } from "./useHoverElement";
export { useParallax } from "./useParallax";
export { useTilt } from "./useTilt";
