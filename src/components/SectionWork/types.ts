import type { CollectionEntry } from "astro:content";
import type { ImageColors } from "../../helpers/getAverageImageColorServer";

export type StackImageLayer = {
  src: string;
  imageColors: ImageColors;
};

export type ArtifactStackCollectionEntry = Omit<
  CollectionEntry<"artifacts">,
  "data"
> & {
  data: Omit<CollectionEntry<"artifacts">["data"], "images"> & {
    images: StackImageLayer[];
  };
};

export type WorkCollectionWithOrgInfo = CollectionEntry<"work"> & {
  data: CollectionEntry<"work">["data"] & {
    orgImage: string;
    orgName: string;
    colors: ImageColors;
  };
};

export type CollectionEntryType =
  | ArtifactStackCollectionEntry
  | CollectionEntry<"artifacts">
  | WorkCollectionWithOrgInfo;
