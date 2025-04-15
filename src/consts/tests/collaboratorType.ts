import type { TEST_SCHEMA } from ".";
import { SVG_GEM } from "../svg";

export const TEST_COLLABORATOR_TYPE: TEST_SCHEMA = {
  intro: {
    icon: SVG_GEM,
    title: "Let's evaluate our alignment.",
    text: "Sincerity is expected.",
  },

  outro: {
    title: "That's the test.",
    text: "Now you know how we might collaborate. If it made you think, maybe send it to someone who should see it.",
  },

  typeStructure: [
    { id: "trait", label: "Core trait" },
    { id: "behavior", label: "Primary behavior" },
    { id: "energy", label: "Energy type" },
    { id: "bring", label: "What you bring" },
    { id: "bringOut", label: "What you bring out in me" },
  ],

  types: [
    {
      id: "ac",
      icon: SVG_GEM,
      label: "The Anchor",
      values: [
        { id: "trait", value: "Stability" },
        { id: "behavior", value: "Follows through, organizes, calms chaos" },
        { id: "energy", value: "Grounded" },
        { id: "bring", value: "Structure, accountability, quiet confidence" },
        {
          id: "bringOut",
          value: "With you, I relax, trust, and move with intention.",
        },
      ],
    },
    {
      id: "sp",
      icon: SVG_GEM,
      label: "The Spark",
      values: [
        { id: "trait", value: "Momentum" },
        { id: "behavior", value: "Energizes teams, shares early, improvises" },
        { id: "energy", value: "Expansive" },
        { id: "bring", value: "Excitement, creativity, momentum" },
        {
          id: "bringOut",
          value: "I think faster. I share sooner. I laugh more.",
        },
      ],
    },
    {
      id: "tn",
      icon: SVG_GEM,
      label: "The Tension",
      values: [
        { id: "trait", value: "Challenge" },
        {
          id: "behavior",
          value: "Pushes back, sharpens quality, questions choices",
        },
        { id: "energy", value: "Intense" },
        { id: "bring", value: "High standards, friction, elevation" },
        {
          id: "bringOut",
          value: "I level up. I stop coasting. I get sharper.",
        },
      ],
    },
  ],

  questions: [
    {
      id: "question-1",
      title: "Stalled motion. You:",
      answers: [
        { type: "ac", label: "Clarify the path" },
        { type: "sp", label: "Introduce disorder" },
        { type: "tn", label: "Expose assumptions" },
      ],
    },
    {
      id: "question-2",
      title: "Approaching consequence. You:",
      answers: [
        { type: "ac", label: "Maintain course" },
        {
          type: "sp",
          label: "Inflame the room",
        },
        { type: "tn", label: "Interrupt mediocrity" },
      ],
    },
    {
      id: "question-3",
      title: "Inception of thought. You:",
      answers: [
        { type: "ac", label: "Shape ideas" },
        { type: "sp", label: "Release chaos" },
        { type: "tn", label: "Reject comfort" },
      ],
    },
    {
      id: "question-4",
      title: "Imperfect offering is given. You:",
      answers: [
        { type: "ac", label: "Reform it" },
        { type: "sp", label: "Extend it" },
        { type: "tn", label: "Test it" },
      ],
    },
    {
      id: "question-5",
      title: "Diminished spirit. You:",
      answers: [
        { type: "ac", label: "Anchor the moment" },
        { type: "sp", label: "Stir unrest" },
        {
          type: "tn",
          label: "Reveal the truth",
        },
      ],
    },
    {
      id: "question-6",
      title: "New alignment begins. You:",
      answers: [
        { type: "ac", label: "Map the roles" },
        { type: "sp", label: "Ignite presence" },
        { type: "tn", label: "Uncover tension" },
      ],
    },
    {
      id: "question-7",
      title: "Deviation is observed. You:",
      answers: [
        { type: "ac", label: "Stabilize" },
        { type: "sp", label: "Reawaken" },
        { type: "tn", label: "Dismantle" },
      ],
    },
    {
      id: "question-8",
      title: "Sense of contribution arises. You:",
      answers: [
        { type: "ac", label: "Make things click" },
        { type: "sp", label: "Fuel motion" },
        { type: "tn", label: "Sharpen the edge" },
      ],
    },
  ],
};
