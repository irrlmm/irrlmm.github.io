type ReleaseNote = {
  version: string;
  title: string;
  text: string;
};

const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "1.2.2",
    title: "Major content update",
    text: "As I checked session recordings, I noticed that people still want to know more about me. So I added the Portfolio section with card stacks. Apart from that, I updated the lead text component by making it motion-enhanced. The bug in Belt is also fixed.",
  },
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
