type Point = [number, number];

type RandomFn = () => number;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const toPercent = (value: number) => `${clamp(value, 0, 100).toFixed(2)}%`;

const toPolygon = (points: Point[]) =>
  `polygon(${points.map(([x, y]) => `${toPercent(x)} ${toPercent(y)}`).join(", ")})`;

const hashString = (input: string) => {
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const mulberry32 = (seed: number): RandomFn => {
  let value = seed;

  return () => {
    value += 0x6d2b79f5;

    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const steppedBetween = (
  random: RandomFn,
  min: number,
  max: number,
  step = 1,
) => {
  const span = Math.round((max - min) / step);
  return min + Math.round(random() * span) * step;
};

const buildChamferedRectangle = (random: RandomFn): Point[] => {
  const corner = steppedBetween(random, 6, 14, 1);

  return [
    [corner, 0],
    [100 - corner, 0],
    [100, corner],
    [100, 100 - corner],
    [100 - corner, 100],
    [corner, 100],
    [0, 100 - corner],
    [0, corner],
  ];
};

const buildSymmetricTrapezoid = (
  random: RandomFn,
  invert = false,
): Point[] => {
  const topInset = steppedBetween(random, 8, 20, 1);
  const bottomInset = steppedBetween(random, 0, 10, 1);

  const actualTopInset = invert ? bottomInset : topInset;
  const actualBottomInset = invert ? topInset : bottomInset;

  return [
    [actualTopInset, 0],
    [100 - actualTopInset, 0],
    [100 - actualBottomInset, 100],
    [actualBottomInset, 100],
  ];
};

const buildSymmetricHex = (random: RandomFn): Point[] => {
  const sideInset = steppedBetween(random, 8, 18, 1);
  const waistY = 50;

  return [
    [sideInset, 0],
    [100 - sideInset, 0],
    [100, waistY],
    [100 - sideInset, 100],
    [sideInset, 100],
    [0, waistY],
  ];
};

const buildParallelogram = (random: RandomFn): Point[] => {
  const slant = steppedBetween(random, 6, 16, 1);
  const leansRight = random() > 0.5;

  if (leansRight) {
    return [
      [slant, 0],
      [100, 0],
      [100 - slant, 100],
      [0, 100],
    ];
  }

  return [
    [0, 0],
    [100 - slant, 0],
    [100, 100],
    [slant, 100],
  ];
};

const SHAPE_BUILDERS = [
  buildChamferedRectangle,
  (random: RandomFn) => buildSymmetricTrapezoid(random, false),
  (random: RandomFn) => buildSymmetricTrapezoid(random, true),
  buildSymmetricHex,
  buildParallelogram,
];

export const getCardClipPath = (seed: string) => {
  const random = mulberry32(hashString(seed));
  const shapeIndex = Math.floor(random() * SHAPE_BUILDERS.length);
  const shape = SHAPE_BUILDERS[shapeIndex];

  return toPolygon(shape(random));
};
