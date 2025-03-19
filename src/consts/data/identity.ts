import { SVG_DEFAULT, SVG_V60 } from "../svg";

export type IdentityItem = {
  id: string;
  title: string;
  description: string;
  value: { main: string; pre?: string; post?: string };
};

export const IDENTITY_ITEM_LOYAL: IdentityItem = {
  id: "loyal",
  title: "Loyal worker",
  description: "Great design takes commitment. That was a great run 🖤",
  value: { main: "7 years", post: "at iMusician" },
};

export const IDENTITY_ITEM_TRAVELER: IdentityItem = {
  id: "travel",
  title: "Explorer at heart",
  description:
    "I find design inspiration in cultures, spaces, and everyday moments.",
  value: {
    pre: "Currently in:",
    main: "Jakarta",
    // post: "🇮🇩 🇻🇳 🇦🇪 🇲🇾 🇹🇭 🇦🇲 🇬🇪 🇲🇪 🇷🇸 🇹🇷 🇪🇸 🇩🇪 🇨🇭 🇫🇮",
  },
};

export const IDENTITY_ITEM_COFFEE: IdentityItem = {
  id: "coffee",
  title: "Pocket barista",
  description:
    "I craft coffee like I design — patiently, precisely, and with flow.",
  value: { main: "", pre: "", post: "" },
};

export const IDENTITY_ITEM_ROADTRIP: IdentityItem = {
  id: "roadtrip",
  title: "Roadtrip UX Analyst",
  description:
    "Every long drive is a usability test for cities, roads, and interfaces.",
  value: { main: "", pre: "", post: "" },
};

export const IDENTITY_ITEM_MUSIC: IdentityItem = {
  id: "music",
  title: "Music designer",
  description:
    "I shape sound like I shape design — structured, intentional, and rhythmic.",
  value: { main: "", pre: "", post: "" },
};
