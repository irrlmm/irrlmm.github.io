type ReleaseNote = {
  version: string;
  title: string;
  text: string;
};

const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "1.1",
    title: "Updated intro card stack",
    text: "Users were skimming too quick, so I dropped boring text content cards and replaced them with more fun and interactive content.",
  },
  {
    version: "1.0.1",
    title: "Metrics tracking improvements",
    text: "Card stack refactoring",
  },
  {
    version: "1.0",
    title: "Initial version",
    text: "Introducing my personal website - made with Astro, React and (Framer) Motion. Built around beautiful card stacks and interactive storytelling. Visual language defined. More fun to come...",
  },
];

export default RELEASE_NOTES;
