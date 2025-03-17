import {
  SVG_CHECKLIST,
  SVG_CODE,
  SVG_DESIGN_SYSTEM,
  SVG_GOAL_MATCH,
  SVG_INTERACTION,
  SVG_UI,
} from "../svg";

export type CompetenceItem = {
  icon: string;
  title: string;
  description: string;
};

export const COMPETENCE_ITEM_DESIGN_SYSTEM: CompetenceItem = {
  icon: SVG_DESIGN_SYSTEM,
  title: "Design Systems",
  description: "A foundation that keeps products consistent and future-proof.",
};

export const COMPETENCE_ITEM_UI: CompetenceItem = {
  icon: SVG_UI,
  title: "Precision UI/UX",
  description: "Interfaces that look sharp and feel effortless.",
};

export const COMPETENCE_ITEM_VALIDATION: CompetenceItem = {
  icon: SVG_CHECKLIST,
  title: "Validation",
  description: "Insights-backed decisions that illuminate the way.",
};

export const COMPETENCE_ITEM_INTERACTIONS: CompetenceItem = {
  icon: SVG_INTERACTION,
  title: "Interactions",
  description: "Smooth and effortless user navigation.",
};

export const COMPETENCE_ITEM_HANDOFFS: CompetenceItem = {
  icon: SVG_CODE,
  title: "Handoffs",
  description: "Documentation that speeds up development.",
};

export const COMPETENCE_ITEM_SOLUTIONS: CompetenceItem = {
  icon: SVG_GOAL_MATCH,
  title: "Solutions",
  description: "Impact boosting engagement and growth.",
};
