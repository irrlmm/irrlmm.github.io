import RELEASE_NOTES from "../release-notes";
import { SVG_STAR, SVG_SWIPE } from "../svg";

const FACTS_JOURNEY: UI.CardStack<
  UI.Card.Fact | UI.Card.Survey | UI.Card.ReleaseNote
> = {
  id: "facts-journey",
  cards: [
    {
      id: "me:adaptive",
      type: "fact",
      icon: { path: SVG_STAR },
      text: "I bring founder energy with scaler speed, fixer grit, and orchestrator flow, shifting as needed",
    },
    {
      id: "me:risky",
      type: "fact",
      icon: { text: "I am not afraid" },
      text: "of taking risks and being responsible for leading projects.",
    },
    {
      id: "survey-missing-piece",
      type: "survey",
      surveyId: "missing_piece",
      text: "Still missing something?",
      options: [
        {
          id: "gap_visuals",
          label: "More visual work",
          response: {
            title: "Got it.",
            text: "I'll add more visuals, UI, and case studies to the mix.",
          },
        },
        {
          id: "gap_clarity",
          label: "More clarity",
          response: {
            title: "Clarity incoming.",
            text: "I'll work on better framing and context across the stack.",
          },
        },
      ],
    },
    // {
    //   id: "survey-user-type",
    //   type: "survey",
    //   surveyId: "user_type",
    //   text: "Who are you anyway?",
    //   options: [
    //     {
    //       id: "user_recruiter",
    //       label: "Recruiter",
    //       response: {
    //         title: "The other guy",
    //         text: "There are a lot of cool case studies and renders awaiting the publish.",
    //       },
    //     },
    //     {
    //       id: "user_engineer",
    //       label: "Engineer",
    //       response: {
    //         title: "The other guy",
    //         text: "There are a lot of cool case studies and renders awaiting the publish.",
    //       },
    //     },
    //     {
    //       id: "user_other",
    //       label: "Other",
    //       response: {
    //         title: "You're just a passerby.",
    //         text: "Well, thank you for jumping in. I hope you liked the experience.",
    //       },
    //     },
    //   ],
    // },
    // {
    //   id: "intro",
    //   type: "fact",
    //   icon: { path: SVG_SWIPE },
    //   text: "Here's a stack of cards about how I ended up doing this for a living.",
    // },
    // {
    //   id: "first-ux",
    //   type: "fact",
    //   icon: { text: "First interface" },
    //   text: "As a kid, I had a potty that played music when it worked. Might be where my love for product design started.",
    // },
    // {
    //   id: "card-design",
    //   type: "fact",
    //   icon: { text: "Plan A" },
    //   text: "Later, I got obsessed with cars. Every notebook turned into a sketchbook (still happens sometimes).",
    // },
    // {
    //   id: "aqua",
    //   type: "fact",
    //   icon: { text: "Aqua fan" },
    //   text: "I used to overdo tables in my notebooks - replicating gloss effects of MacOS X by hand. Yes, I was a weird kid.",
    // },
    // {
    //   id: "c#",
    //   type: "fact",
    //   icon: { text: "Shell designer" },
    //   text: "At uni, I couldn't stand how basic everything was, so I built a C# shell to survive. I guess that counts as design.",
    // },
    // {
    //   id: "uniyo",
    //   type: "fact",
    //   icon: { text: "Turning point" },
    //   text: "At 20, I started coding well enough to earn my first work experience at a San Francisco startup.",
    // },
    // {
    //   id: "sweet-spot",
    //   type: "fact",
    //   icon: { text: "Sweet spot" },
    //   text: "Even after landing a dev role, I kept choosing the designer seat at side projects and competitions.",
    // },
    // {
    //   id: "breakpoint",
    //   type: "fact",
    //   icon: { text: "The breakpoint" },
    //   text: "I joined iMusician as a frontend developer, but instantly jumped into shaping the growing platform.",
    // },
    // {
    //   id: "results",
    //   type: "fact",
    //   icon: { text: "UX wizardy" },
    //   text: "That was a time when something innovative was made incidentally and became a platform foundation.",
    // },
    // {
    //   id: "magnum-opus",
    //   type: "fact",
    //   icon: { text: "Magnum opus" },
    //   text: "Seven years later, I'm a senior product designer - shaping everything from micro-flows to jumbo products.",
    // },
    // {
    //   id: "outro",
    //   type: "fact",
    //   icon: { path: SVG_GEM },
    //   text: "Now, I feel ready to take on more - with people who care. I think I'm made for this.",
    // },
  ],
};

export default FACTS_JOURNEY;
