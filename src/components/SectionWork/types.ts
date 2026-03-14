import type { CollectionEntry } from "astro:content";
import type { ImageColors } from "../../helpers/getAverageImageColorServer";

export type WorkCollectionWithOrgInfo = CollectionEntry<"work"> & {
  data: CollectionEntry<"work">["data"] & {
    orgImage: string;
    orgName: string;
    colors: ImageColors;
  };
};

export type CollectionEntryType =
  | CollectionEntry<"artifacts">
  | WorkCollectionWithOrgInfo;
