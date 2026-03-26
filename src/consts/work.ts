const WORK_STACK_IMAGES: Record<string, string[]> = {
  imd: [
    "work/imd/auth.png",
    "work/imd/home.png",
    "work/imd/checkout.png",
    "work/imd/sidewindow.png",
  ],
  "imd ishigs": [
    "work/ishigs/im-layer-1.png",
    "work/ishigs/im-layer-2.png",
    "work/ishigs/im-layer-3.png",
    "work/ishigs/modal-large.png",
  ],
  "imd artist hub": [
    "work/artist-hub/ap-0.png",
    "work/artist-hub/ap-pages.png",
    "work/artist-hub/rp-2.png",
  ],
  "mb safe dashboard": [
    "work/mbux/mbux-1.png",
    "work/mbux/mbux-2.png",
    "work/mbux/mbux-3.png",
    "work/mbux/mbux-4.png",
  ],
  "reedsy-ds": [
    "work/reedsy/cover.png",
    "work/reedsy/cat-cover.png",
    "work/reedsy/spider.png",
    "work/reedsy/noir.png",
  ],
  "studio-ai": [
    "work/reedsy/cover.png",
    "work/reedsy/cat-cover.png",
    "work/reedsy/spider.png",
    "work/reedsy/noir.png",
  ],
};

const withMinimumLayers = (images: string[], minimum = 3) => {
  if (images.length >= minimum) {
    return images;
  }

  if (images.length === 0) {
    return images;
  }

  return [
    ...images,
    ...Array.from({ length: minimum - images.length }, () => images[0]),
  ];
};

export const getWorkStackImages = (workId: string, coverImage: string) => {
  const explicit = WORK_STACK_IMAGES[workId];

  if (explicit?.length) {
    return withMinimumLayers(explicit);
  }

  return withMinimumLayers([coverImage]);
};
