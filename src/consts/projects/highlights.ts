import imdHome from "../../assets/work/imd/home.png";
import imdSidewindows from "../../assets/work/imd/sidewindow.png";
import imdAuth from "../../assets/work/imd/auth.png";
import imdCheckout from "../../assets/work/imd/checkout.png";

import imdDSCover from "../../assets/work/imd-ds/cover.png";
import imdDSVars from "../../assets/work/imd-ds/variables.png";
import imdDSFields from "../../assets/work/imd-ds/fields.png";

import ishigsEmpty from "../../assets/work/ishigs/empty.png";
import ishigsPrompt from "../../assets/work/ishigs/prompt.png";
import ishigsModal from "../../assets/work/ishigs/modal-large.png";
import ishigsTracks from "../../assets/work/ishigs/tracks.png";
import ishigsComponents from "../../assets/work/ishigs/components.png";

import ap0 from "../../assets/work/artist-hub/ap-0.png";
import apPages from "../../assets/work/artist-hub/ap-pages.png";
import rp2 from "../../assets/work/artist-hub/rp-2.png";

import mbuxHome from "../../assets/work/mbux/home.png";
import mbuxMenu from "../../assets/work/mbux/menu.png";
import mbuxMenuScheme from "../../assets/work/mbux/menu-scheme.png";

import cofefi from "../../assets/work/cofefi/cofefi.png";

import camera from "../../assets/work/camera-app/cover.png";

const PROJECTS_HIGHLIGHTS: UI.Project[] = [
  {
    id: "imd:platform",
    title: "iMusician",
    timeline: "2017-2025",
    lines: [
      "Music distribution is boring. No one had unlocked its true potential - until we tried.",
      "I challenged the status quo, leading product design (and frontend before that) to turn a simple tool into a SaaS powerhouse for modern musicians.",
    ],
    imgs: [imdHome, imdSidewindows, imdCheckout, imdAuth],
    link: {
      label: "Website",
      href: `https://app.imusician.pro`,
      external: true,
    },
  },
  {
    id: "imd:instant-mastering",
    title: "iMusician: Instant Music Mastering, powered by AI",
    timeline: "2025",
    lines: [
      "Given: emergency vendor dropout and users unhappy with old mastering ways.",
      "Task: design and build a new mastering tool from scratch, in-house, under brutal time constraints.",
      "Result: focused, minimal, industry-standard-setting app with amazing sound output.",
    ],
    imgs: [
      ishigsPrompt,
      ishigsComponents,
      ishigsTracks,
      ishigsEmpty,
      ishigsModal,
    ],
    link: {
      label: "Case study",
      href: "https://www.behance.net/gallery/223450275/iMusician-AI-Music-Mastering-Tool",
      external: true,
    },
  },
  {
    id: "imd:design-system",
    title: "iMD Design System",
    timeline: "2017-2025",
    lines: [
      "Built for scalability and versatility from day one.",
      "Started as a code-only Storybook collection in our frontend monorepo.",
      "Later evolved in Figma empowering anyone be a designer and rapidly craft prototypes at any resolution.",
    ],
    imgs: [imdDSCover, imdDSVars, imdDSFields],
    link: {
      label: "Case study",
      href: "https://www.behance.net/gallery/224724459/iMusician-Building-Scalable-Design-System",
      external: true,
    },
  },
  {
    id: "imd:artist-hub",
    title: "Artist Hub",
    timeline: "2021-2024",
    lines: [
      "Artists need a place to be seen. Without a personal brand, music gets lost.",
      "iMusician's Artist Hub is a series of website generators for artist profiles and release pages, designed for 1-click setup, customization and smart data aggregation.",
      "Powered by market research and user insights, built for visibility and growth.",
    ],
    imgs: [ap0, apPages, rp2],
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
    imgs: [cofefi, camera, mbuxHome, mbuxMenu, mbuxMenuScheme],
  },
];

export default PROJECTS_HIGHLIGHTS;
