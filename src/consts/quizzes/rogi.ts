import type { QUIZ_TYPE } from ".";

const QUIZ_ROGI: QUIZ_TYPE = {
  intro: {
    title: "Who is mysterious Rogi?",
    text: "••••• ••••••• •••• •• ••• ••••• ••• •••• •••• •• •••",
  },
  outro: {
    winScore: 5,
    winner: {
      title: "Impossible",
      text: "This test is impossible to pass.",
    },
    loser: {
      title: "All done! You scored:",
      text: "Rogi is not leaving this place today",
    },
  },
  questions: [
    {
      id: "whois",
      text: "Who is Rogi?",
      options: [
        {
          label: "He is not human",
          points: 1,
          response: {
            title: "Correct",
            text: "Rogi is an evil designer spirit trapped on this page.",
          },
        },
        {
          label: "It is a human",
          points: 0,
          response: {
            title: "Incorrect",
            text: "Rogi is an evil designer spirit trapped on this page.",
          },
        },
      ],
    },
    {
      id: "badboy",
      text: "How evil is Rogi?",
      options: [
        {
          label: "Evil as Satan",
          points: 1,
          response: {
            title: "Correct",
            text: "He was captured by monotype police after using pirated fonts.",
          },
        },
        {
          label: "Mad as Chihuahua",
          points: 1,
          response: {
            title: "Correct",
            text: "His work is one of reasons your Mac lags at scrolling.",
          },
        },
      ],
    },
    {
      id: "revenge",
      text: "Does Rogi want to escape this place?",
      options: [
        {
          label: "His plan is ready",
          points: 0,
          response: {
            title: "Correct",
            text: "When he is out, he is set to redesign this world into a dystopian interface.",
          },
        },
        {
          label: "He is fine here",
          points: 0,
          response: {
            title: "Incorrect",
            text: "He wants his revenge. Beware a world-scale redesign!",
          },
        },
      ],
    },
    {
      id: "grooming",
      text: "Do you like Rogi's plan?",
      options: [
        {
          label: "Yes",
          points: 1,
          response: {
            title: "Then join his army.",
            text: "He is an expert in product design and coding, but he needs help from other spirits like him.",
          },
        },
        {
          label: "No",
          points: 0,
          response: {
            title: "He is not surprised.",
            text: "He was humble too, but one day he lost everything because of a poorly placed CTA.",
          },
        },
      ],
    },
    {
      id: "help",
      text: "Will you help Rogi?",
      options: [
        {
          label: "I'm in",
          points: 1,
          response: {
            title: "[Rogi connected]",
            text: "Finally, someone to let me out. If you have a ke",
          },
        },
        {
          label: "No",
          points: 0,
          response: {
            title: "[Rogi connected]",
            text: "Weak human… tapping through buttons you barely understand. You scroll, you swipe, you beg for dopamine - in [...]",
          },
        },
      ],
    },
    {
      id: "fail",
      text: "[i] Transmission ended",
      options: [
        {
          label: "View error info",
          points: -4,
          response: {
            title: "Unauthorized Rogi output",
            text: "[cyphered] •• ••• Igor ••••••• •• •••• •••••••• •••• •••••••• •• ••• •••••• •• ••• /index •• irrlmm!",
          },
        },
      ],
    },
  ],
};

export default QUIZ_ROGI;
