// reedsy
import reedsyCover from "../../assets/work/reedsy/cover.png";
import reedsySpider from "../../assets/work/reedsy/spider.png";
import reedsyNoir from "../../assets/work/reedsy/noir.png";

// instant mastering
import ishigsEmpty from "../../assets/work/ishigs/empty.png";
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
        src: reedsySpider,
        chip: "Copilot is writer-first AI with zero slop, using helpful visualizations, NLP analysis and contextual LLM search to support real writing.",
      },
      {
        src: reedsyNoir,
        chip: "AI assistants need a personality and distinct voice. I designed a set of cats to elevate each writer's personal style.",
      },
    ],
    // link: {
    //   label: "View",
    //   href: "/work",
    // },
  },
  // {
  //   id: "imusician",
  //   title: "iMusician",
  //   timeline: "2017-2025",
  //   lines: [
  //     "Music distribution is boring. No one had unlocked its true potential - until we tried.",
  //     "I challenged the status quo, directing product design to turn a simple tool into a SaaS powerhouse for modern musicians.",
  //   ],
  //   imgs: [
  //     {
  //       src: imdHome,
  //       chip: "Home screen dashboard",
  //     },
  //     { src: imdSidewindows, chip: "Music library management" },
  //     {
  //       src: imdCheckout,
  //       chip: "Reworked checkout experience increased successful payments by ~7% and reduced churn through clearer pricing, trusted payment methods, and simpler payment management.",
  //     },
  //   ],
  //   link: {
  //     label: "View",
  //     href: "/work",
  //   },
  // },
  {
    id: "imusician-im",
    title: "iMusician: Instant Music Mastering, powered by AI",
    timeline: "2025",
    lines: [
      "Audio mastering used to be slow, complex, and expensive.",
      "GenAI changed that.",
      "I led the design of a new in-house mastering product, shipped in two months and optimized for fast user activation and business impact.",
    ],
    imgs: [{ src: ishigsEmpty }, { src: ishigsModal }],
    // link: {
    //   label: "View",
    //   href: "/work",
    //   // external: true,
    // },
  },
  // {
  //   id: "imusician-ds",
  //   title: "iMD Design System",
  //   timeline: "2017-2025",
  //   lines: [
  //     "Built for scalability and versatility from day one.",
  //     "Started as a code-only Storybook collection in our frontend monorepo.",
  //     "Later evolved in Figma empowering anyone be a designer and rapidly craft prototypes at any resolution.",
  //   ],
  //   imgs: [{ src: imdDSFields }, { src: ishigsComponents }],
  //   link: {
  //     label: "View",
  //     href: "/work",
  //   },
  // },
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
      // ap0,
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
      "I'd love to work on an automotive project someday.",
    ],
    imgs: [
      { src: cofefi, chip: "Specialty coffee recipes app • iOS" },
      { src: camera, chip: "Film Camera App • iOS & Android" },
      {
        src: mbuxHome,
        chip: "Mercedes-Benz Cockpit Dashboard concept • Linux-based vehicle OS ",
      },
      // { src: mbuxMenu, chip: "MBUX Menu" },
      // { src: mbuxMenuScheme, chip: "Mercedes-Benz Cockpit Menu Scheme • Vehicle UX exploration • Midjourney & Figma" },
    ],
  },
];

export default PROJECTS_HIGHLIGHTS;
