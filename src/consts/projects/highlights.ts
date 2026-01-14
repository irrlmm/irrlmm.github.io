// reedsy
import reedsyCover from "../../assets/work/reedsy/cover.png";
import reedsyViz from "../../assets/work/reedsy/spider.png";
import reedsyNoir from "../../assets/work/reedsy/noir.png";

// instant mastering
import ishigsStep2 from "../../assets/work/ishigs/step-2.png";
import ishigsModal from "../../assets/work/ishigs/modal-large.png";

// artist hub
import apPages from "../../assets/work/artist-hub/ap-pages.png";
import rp2 from "../../assets/work/artist-hub/rp-2.png";

// extras
import mbuxHome from "../../assets/work/mbux/home.png";
import cofefi from "../../assets/work/cofefi/cofefi.png";
import camera from "../../assets/work/camera-app/cover.png";

const PROJECTS_HIGHLIGHTS: UI.Project[] = [
  {
    id: "narrative-copilot",
    title: "Reedsy Studio: Narrative Copilot",
    timeline: "2026",
    lines: [
      "AI-powered narrative copilot for book authors, focused on editorial-level analysis rather than generation.",
      "For 6 months, I drove discovery, product vision, and high-fidelity prototyping as consulting Lead Product Designer.",
    ],
    imgs: [
      {
        src: reedsyCover,
        chip: "I led design of AI-assisted writing features that demonstrated early 2-month retention uplift in closed testing.",
      },
      {
        src: reedsyViz,
        chip: "Copilot is writer-first AI with zero slop, using helpful visualizations, NLP analysis and contextual LLM search to support real writing.",
      },
      {
        src: reedsyNoir,
        chip: "AI assistants need a personality and distinct voice. I created a set of cats to elevate each writer's personal style.",
      },
    ],
    // link: {
    //   label: "View",
    //   href: "/work",
    // },
  },
  {
    id: "imusician-im",
    title: "iMusician: Instant Music Mastering, powered by AI",
    timeline: "2025",
    lines: [
      "Audio mastering used to be slow, complex, and expensive.",
      "A shift in users' behavior and GenAI tech changed that.",
      "I led the design of a new in-house mastering product, shipped in two months and optimized for fast user activation and virality.",
    ],
    imgs: [
      {
        src: ishigsStep2,
        chip: "Mastered previews are generated almost instantly, making comparison frictionless.",
      },
      {
        src: ishigsModal,
        chip: "One in four users adopted the new Reference Mastering feature, proving its value.",
      },
    ],
    // link: {
    //   label: "View",
    //   href: "/work",
    //   // external: true,
    // },
  },
  {
    id: "imusician-ah",
    title: "iMusician: Artist Hub",
    timeline: "2024",
    lines: [
      "Artists need a place to be seen. Without a personal brand, music gets lost.",
      "iMusician's Artist Hub is a series of website generators for artist profiles and release pages, designed for 1-click setup, customization and smart data aggregation.",
      "Powered by market research and user insights, built for visibility and growth.",
    ],
    imgs: [
      {
        src: apPages,
        chip: "Artist Page • A WYSIWYG editor and website publishing platform for musicians to showcase their work, bio, tour dates, and merch.",
      },
      {
        src: rp2,
        chip: "Release Page • A music release hub with pre-save, streaming links, and social sharing to maximize reach and engagement.",
      },
    ],
  },
  {
    id: "others",
    title: "Pet projects & concepts",
    timeline: "∞",
    lines: [
      "Self-driven explorations into new UX paradigms and industries.",
      "Recently researched automotive HMI systems, learning Blender and real-time rendering to prototype infotainment UIs.",
      "I’d love to work on a project where analog controls and software design flexibility are fused together.",
    ],
    imgs: [
      { src: cofefi, chip: "Specialty coffee recipes app • iOS" },
      { src: camera, chip: "Film Camera App • iOS & Android" },
      {
        src: mbuxHome,
        chip: "Mercedes-Benz Cockpit Dashboard concept • Linux-based vehicle OS ",
      },
    ],
  },
];

export default PROJECTS_HIGHLIGHTS;
