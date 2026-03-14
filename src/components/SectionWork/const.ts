import type { LightningEffectInput } from "../../helpers/lightbox";

export const cardLightConfig: LightningEffectInput = {
  tilt: 17.5,
  lightEffectIntensity: 0.66,
  lightPoint: [0.25, 0.25],
};

export const cardVariants = {
  hidden: { scale: 0.975, opacity: 0, rotateX: 0, rotateY: 0 },
  shown: {
    scale: 1,
    opacity: 1,
  },
  hover: { scale: 1.05 },
};
