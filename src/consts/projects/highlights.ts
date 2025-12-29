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

import logoImd from "../../assets/companies/99sales.png";

import camera from "../../assets/work/camera-app/cover.png";

const PROJECTS_HIGHLIGHTS: UI.Project[] = [
  {
    id: "imd:platform",
    title: "iMusician",
    timeline: "2017-2025",
    lines: [
      "Music distribution is boring. No one had unlocked its true potential - until we tried.",
      "I challenged the status quo, directing product design to turn a simple tool into a SaaS powerhouse for modern musicians.",
    ],
    imgs: [
      {
        src: imdHome,
        chip: "Home screen dashboard",
      },
      { src: imdSidewindows, chip: "Music library management" },
      {
        src: imdCheckout,
        chip: "Reworked checkout experience increased successful payments by ~7% and reduced churn through clearer pricing, trusted payment methods, and simpler payment management.",
      },
    ],
    link: {
      label: "View",
      href: "/work",
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
      { src: ishigsTracks, chip: "Tracks" },
      // { src: ishigsPrompt, chip: "Prompt" },
      { src: ishigsEmpty, chip: "Empty" },
      { src: ishigsModal, chip: "Modal" },
    ],
    link: {
      label: "View",
      href: "/work",
      // external: true,
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
    imgs: [
      { src: imdDSCover, chip: "Cover" },
      // { src: imdDSVars, chip: "Variables" },
      { src: imdDSFields, chip: "Fields" },
      { src: ishigsComponents, chip: "Components" },
    ],
    link: {
      label: "View",
      href: "/work",
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
        logo: logoImd,
      },
      // { src: mbuxMenu, chip: "MBUX Menu" },
      // { src: mbuxMenuScheme, chip: "Mercedes-Benz Cockpit Menu Scheme • Vehicle UX exploration • Midjourney & Figma" },
    ],
  },
];

export default PROJECTS_HIGHLIGHTS;
