import { SVG_DEFAULT, SVG_V60 } from "../svg";

export type IdentityItem = {
  id: string;
  title: string;
  description: string;
  values: string[];
  icon: string;
};

export const IDENTITY_ITEM_LOYAL: IdentityItem = {
  id: "loyal",
  title: "Loyal worker",
  description: "Great design takes commitment. That was a great run 🖤",
  values: ["7 years"],
  icon: SVG_DEFAULT,
};

export const IDENTITY_ITEM_TRAVELER: IdentityItem = {
  id: "travel",
  title: "Explorer at heart",
  description:
    "I find design inspiration in cultures, spaces, and everyday moments.",
  values: ["Da Nang, Vietnam"],
  icon: SVG_DEFAULT,
};

export const IDENTITY_ITEM_COFFEE: IdentityItem = {
  id: "coffee",
  title: "Pocket barista",
  description:
    "I craft coffee like I design — patiently, precisely, and with flow.",
  values: ["2 cups / day"],
  icon: SVG_V60,
};

export const IDENTITY_ITEM_ROADTRIP: IdentityItem = {
  id: "roadtrip",
  title: "Roadtrip UX Analyst",
  description:
    "Every long drive is a usability test for cities, roads, and interfaces.",
  values: ["MB W177", "1100 km / day"],
  icon: SVG_DEFAULT,
};

export const IDENTITY_ITEM_MUSIC: IdentityItem = {
  id: "music",
  title: "Music designer",
  description:
    "I shape sound like I shape design — structured, intentional, and rhythmic.",
  values: ["SP404-MKII", "Hip-Hop"],
  icon: SVG_DEFAULT,
};
