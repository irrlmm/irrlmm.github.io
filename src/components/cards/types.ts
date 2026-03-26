import type { CollectionEntry } from "astro:content";

import type { ImageColors } from "../../helpers/getAverageImageColorServer";

export type StackImageLayer = {
  src: string;
  imageColors: ImageColors;
};

export type ArtifactStack = Omit<CollectionEntry<"artifacts">, "data"> & {
  data: Omit<CollectionEntry<"artifacts">["data"], "images"> & {
    images: StackImageLayer[];
  };
};

export type WorkWithOrg = CollectionEntry<"work"> & {
  data: CollectionEntry<"work">["data"] & {
    orgImage: string;
    orgImageAspect: number;
    orgName: string;
    colors: ImageColors;
  };
};
