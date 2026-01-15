type ReleaseNote = {
  version: string;
  title: string;
  text: string;
};

const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "2.0.a",
    title: "Case studies",
    text: "Refreshed highlights. Revamped the entire website with a new 'Work' section showcasing recent projects and case studies. Added the header for easier navigation.",
  },
  {
    version: "1.3.2",
    title: "Work showcase & interactive cards",
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
