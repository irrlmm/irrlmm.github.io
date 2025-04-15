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
    text: "1. Try making impact using minimum resources.",
  },
  {
    id: "p2",
    icon: SVG_DEFAULT,
    text: "2. Be the real user of a product you are designing.",
  },
  {
    id: "p3",
    icon: SVG_DEFAULT,
    text: "[WIP] More soon.",
  },
  // {
  //   id: "p1-b",
  //   text: "Solve one problem at a time. Write less code. Don't sit on single idea for too long. Use only necessary tools.",
  // },
];

export default FACTS_PRINCIPLES;
