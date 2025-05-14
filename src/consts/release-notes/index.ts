type ReleaseNote = {
  version: string;
  title: string;
  text: string;
};

const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "1.2.12",
    title: "Major content update",
    text: "Added a Portfolio section with card stacks since people were curious to learn more. The lead text is now motion-enhanced. Fixed the Belt bug. Updated the CV.",
  },
  {
    version: "1.1",
    title: "Updated intro card stack",
    text: "Users weren't reading the boring intro text cards, so I swapped them for more interactive content: a latest case study card and a WebGL animation.",
  },
  {
    version: "1.0",
    title: "Initial version",
    text: "Introduced my personal website — made with Astro, React, and (Framer) Motion. Built around beautiful card stacks and interactive storytelling. Visual language defined. More fun to come...",
  },
];

export default RELEASE_NOTES;
