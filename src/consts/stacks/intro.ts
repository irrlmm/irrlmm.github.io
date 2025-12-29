import RELEASE_NOTES from "../release-notes";
import { SVG_GEM } from "../svg";

const STACK_INTRO: UI.CardStack<
  | UI.Card.Fact
  | UI.Card.CaseStudy
  | UI.Card.ProductEye
  | UI.Card.ReleaseNote
  | UI.Card.Facts
> = {
  id: "facts-intro",
  cards: [
    {
      id: "case-study-test",
      type: "case-study",
      title: "iMusician: AI Music Mastering Tool",
      link: {
        label: "Read now",
        href: "https://www.behance.net/gallery/223450275/Instant-Mastering-Instant-Remake",
        external: true,
      },
    },
    {
      id: "punchline",
      type: "facts",
      title: "Daily Wisdom",
      lines: [
        "Maximum impact can be achieved with minimum resources",
        "Perfect timing beats perfect polish",
        "Loops should never feel like traps",
        "[ROGI] Portal opened at /undefined. Find it. Quick!",
      ],
    },
    {
      id: "me:adaptive",
      type: "fact",
      icon: { path: SVG_GEM },
      text: "I bring founder energy with scaler speed, fixer grit, and orchestrator flow, shifting as needed.",
    },
    {
      id: "product-eye",
      type: "product-eye",
      title: "Rogi is watching",
      text: "Fresh user signals received. Page optimization ongoing.",
    },
    {
      id: "release-note",
      type: "release-note",
      version: RELEASE_NOTES[0].version,
      title: RELEASE_NOTES[0].title,
      link: {
        href: "/changelog",
        label: "View changelog",
      },
    },
  ],
};

export default STACK_INTRO;
