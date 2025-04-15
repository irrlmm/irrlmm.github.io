import type { Fact } from ".";
import { SVG_DEFAULT, SVG_SWIPE } from "../svg";

const FACTS_PRINCIPLES: Fact[] = [
  {
    id: "intro",
    icon: SVG_SWIPE,
    text: "This is a stack of core design principles I stand by.",
  },
  {
    id: "p1",
    icon: SVG_DEFAULT,
    text: "Try making impact using minimum resources.",
  },
  {
    id: "p2",
    icon: SVG_DEFAULT,
    text: "Be the real user of a product you are designing.",
  },
  {
    id: "p3",
    icon: SVG_DEFAULT,
    text: "Borrow from places that don't belong - and make it work better than expected.",
  },
  {
    id: "p4",
    icon: SVG_DEFAULT,
    text: "Isolate to find your voice - then flip fully into collaboration.",
  },
  {
    id: "p5",
    text: "Ready for a final one?",
  },
  {
    id: "p6",
    text: "A good designer is basically a translator.",
  },
  {
    id: "p7",
    text: " Yes, that's all.",
  },
];

export default FACTS_PRINCIPLES;
