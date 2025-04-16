import type { Fact } from ".";
import { SVG_GEM, SVG_STAR, SVG_SWIPE } from "../svg";

const FACTS_INTRO: Fact[] = [
  {
    id: "intro",
    icon: { path: SVG_SWIPE },
    text: "Swipe/drag through. Each card is a hit of who I am.",
  },
  {
    id: "f1",
    text: "For nearly a decade, I was shaped by urgency, grounded in clarity, through function and dysfunction alike.",
  },
  {
    id: "f2",
    text: "This made me immune to chaos, adaptable to any constraint, and I don't flinch under pressure.",
  },
  {
    id: "f3",
    text: "The products I have designed were built to last. Each one has grown, delivered value and pushed the business forward.",
  },
  {
    id: "f4",
    text: "One of the keys is my tech foundation. I started in UI engineering and still work closely with developers.",
  },
  {
    id: "f5",
    text: "We iterate quickly, but nothing appears out of thin air. Everything I do is drawn from experience.",
  },
  {
    id: "f6",
    text: "That experience comes from travel, photography, making music, and a lifelong habit of collecting curious products.",
  },
  {
    id: "f7",
    text: "All fueled by 2 cups of filter coffee, a result of precise - yes - design process.",
  },
  {
    id: "outro",
    icon: { path: SVG_GEM },
    text: "Now you know a bit about me. The rest lives with Rogi, but he tends to exaggerate.",
  },
];

export default FACTS_INTRO;
