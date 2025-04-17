import type { Fact } from ".";
import { SVG_GEM, SVG_SWIPE } from "../svg";

const FACTS_STORY: Fact[] = [
  {
    id: "intro",
    icon: { path: SVG_SWIPE },
    text: "Here's a stack of cards about how I ended up doing this for a living.",
  },
  {
    id: "first-ux",
    icon: { text: "First interface" },
    text: "As a kid, I had a potty that played music when it worked. Might be where my love for product design started.",
  },
  {
    id: "card-design",
    icon: { text: "Plan A" },
    text: "Later, I got obsessed with cars. Every notebook turned into a sketchbook (still happens sometimes).",
  },
  {
    id: "aqua",
    icon: { text: "Aqua fan" },
    text: "I used to overdo tables in my notebooks - replicating gloss effects of MacOS X by hand. Yes, I was a weird kid.",
  },
  {
    id: "c#",
    icon: { text: "Shell designer" },
    text: "At uni, I couldn't stand how basic everything was, so I built a C# shell to survive. I guess that counts as design.",
  },
  {
    id: "uniyo",
    icon: { text: "Turning point" },
    text: "At 20, I started coding well enough to earn my first work experience at a San Francisco startup.",
  },
  {
    id: "sweet-spot",
    icon: { text: "Sweet spot" },
    text: "Even after landing a dev role, I kept choosing the designer seat at side projects and competitions.",
  },
  {
    id: "breakpoint",
    icon: { text: "The breakpoint" },
    text: "I joined iMusician as a frontend developer, but instantly jumped into shaping the growing platform.",
  },
  {
    id: "results",
    icon: { text: "UX wizardy" },
    text: "That was a time when something innovative was made incidentally and became a strong UX foundation.",
  },
  {
    id: "magnum-opus",
    icon: { text: "Magnum opus" },
    text: "Seven years later, I'm a senior product designer - shaping everything from micro-flows to jumbo products.",
  },
  {
    id: "outro",
    icon: { path: SVG_GEM },
    text: "Now, I feel ready to take on more - with people who care. I think I'm made for this.",
  },
];

export default FACTS_STORY;
