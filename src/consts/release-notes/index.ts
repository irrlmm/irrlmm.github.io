type ReleaseNote = {
  version: string;
  title: string;
  text: string;
};

const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "1.2.9",
    title: "Major content update",
    text: "As I checked session recordings, I noticed that people still want to know more about me. So I added the Portfolio section with card stacks. Apart from that, I updated the lead text component by making it motion-enhanced. The bug in Belt is also fixed. Updated CV.",
  },
  {
    version: "1.1",
    title: "Updated intro card stack",
    text: "Users were not reading text cards in the intro, so I replaced them with more interactive content like a latest case study card and fun WebGL animation.",
  },
  {
    version: "1.0",
    title: "Initial version",
    text: "Introducing my personal website - made with Astro, React and (Framer) Motion. Built around beautiful card stacks and interactive storytelling. Visual language defined. More fun to come...",
  },
];

export default RELEASE_NOTES;
