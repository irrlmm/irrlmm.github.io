import type { LightningEffectInput } from "../../helpers/lightbox";
import { pew } from "../../helpers/motion";

export const cardLightConfig: LightningEffectInput = {
  tilt: 15,
  lightEffectIntensity: 0.75,
  lightPoint: [0.25, 0.25],
};

export const p = 0.33;

export const transition = pew(p);

export const wrapperVariants = {
  hidden: { scale: 0.975, opacity: 0, rotateX: 0, rotateY: 0, transition },
  shown: {
    scale: 1,
    opacity: 1,
    transition,
  },
};

export const variants = {
  hidden: {},
  default: {
    scale: 1,
    transition,
  },
  hover: {
    scale: 1.05,
    transition,
  },
};
