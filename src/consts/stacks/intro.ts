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
      title: "Instant Mastering: Instant Remake",
      link: {
        label: "Read now",
        href: "https://www.behance.net/gallery/223450275/Instant-Mastering-Instant-Remake",
        external: true,
      },
    },
    {
      id: "product-eye",
      type: "product-eye",
      title: "Rogi is watching",
      text: "Fresh user signals received. Page optimization ongoing.",
    },
    {
      id: "punchline",
      type: "facts",
      title: "Daily Wisdom",
      lines: [
        "A designer's ego is even more fragile than the product",
        "Always curate the feedback",
        "Try making maximum impact with minimum resources",
        "Perfect timing beats perfect polish",
        "If a system needs explaining, it needs redesigning",
        "Good products save time. Great products create time",
        "Loops should never feel like traps",
      ],
    },

    // {
    //   id: "f7",
    //   icon: { path: SVG_V60 },
    //   text: "Making filter coffee is a design process — balancing precision, flow, and timing.",
    // },

    // {
    //   id: "release-note",
    //   type: "release-note",
    //   version: RELEASE_NOTES[0].version,
    //   title: RELEASE_NOTES[0].title,
    //   link: {
    //     href: "/changelog",
    //     label: "View changelog",
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
    //   id: "outro",
    //   payload: {
    //     icon: { path: SVG_GEM },
    //     text: "Now you know a bit about me. The rest lives with Rogi, but he tends to exaggerate.",
    //   },
    // },
  ],
};

export default STACK_INTRO;
