import type { FactStack } from ".";

const FACTS_INTRO: FactStack = {
  id: "facts-intro",
  facts: [
    {
      id: "case-study-test",
      type: "case-study",
      payload: {
        image: "work/ishigs/cover.png",
        title: "Instant Mastering: Instant Remake",
        link: {
          label: "Read now",
          href: "https://behance.net/irrlmm",
          external: true,
        },
      },
    },
    {
      id: "product-eye",
      type: "product-eye",
      payload: {
        title: "Stack metrics",
        text: "this user is engaged",
      },
    },
    {
      id: "release-note",
      type: "release-note",
      payload: {
        title: "v1.2",
        lines: [
          "Changed intro text style from corporate to more human",
          "The intro card stack is now much more interesting to swipe through",
        ],
      },
    },
    // {
    //   id: "intro",
    //   payload: {
    //     icon: { path: SVG_SWIPE },
    //     text: "Swipe/drag through. Each card is a hit of who I am.",
    //   },
    // },
    // {
    //   id: "f1",
    //   payload: {
    //     text: "For nearly a decade, I was shaped by urgency, grounded in clarity, through function and dysfunction alike.",
    //   },
    // },
    // {
    //   id: "f2",
    //   payload: {
    //     text: "This made me immune to chaos, adaptable to any constraint, and I don't flinch under pressure.",
    //   },
    // },
    // {
    //   id: "f3",
    //   payload: {
    //     text: "The products I have designed were built to last. Each one has grown, delivered value and pushed the business forward.",
    //   },
    // },
    // {
    //   id: "f4",
    //   payload: {
    //     text: "One of the keys is my tech foundation. I started in UI engineering and still work closely with developers.",
    //   },
    // },
    // {
    //   id: "f5",
    //   payload: {
    //     text: "We iterate quickly, but nothing appears out of thin air. Everything I do is drawn from experience.",
    //   },
    // },
    // {
    //   id: "f6",
    //   payload: {
    //     text: "That experience comes from travel, photography, making music, and a lifelong habit of collecting curious products.",
    //   },
    // },
    // {
    //   id: "f7",
    //   payload: {
    //     text: "All fueled by 2 cups of filter coffee, a result of precise - yes - design process.",
    //   },
    // },
    // {
    //   id: "outro",
    //   payload: {
    //     icon: { path: SVG_GEM },
    //     text: "Now you know a bit about me. The rest lives with Rogi, but he tends to exaggerate.",
    //   },
    // },
  ],
};

export default FACTS_INTRO;
