import type { CollectionEntry } from "astro:content";
import type {
  ArtifactStack,
  WorkWithOrg,
} from "../cards/types";

export type ArtifactDefault = CollectionEntry<"artifacts">;

export type SectionWorkItem =
  | {
      kind: "artifact-note";
      item: ArtifactDefault;
    }
  | {
      kind: "artifact-stack";
      item: ArtifactStack;
    }
  | {
      kind: "work-default";
      item: WorkWithOrg;
    };
