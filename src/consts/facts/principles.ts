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
    icon: SVG_DEFAULT,
    text: "Curate the feedback and translate it into decisions.",
  },
  {
    id: "p7",
    icon: SVG_DEFAULT,
    text: "A product designer is a translator.",
  },
  {
    id: "p8",
    icon: SVG_DEFAULT,
    text: "And only then, a designer.",
  },
];

export default FACTS_PRINCIPLES;
