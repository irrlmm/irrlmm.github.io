---
intro:
  {
    title: "Collaboration takes many forms.",
    text: "Pass this quick test to see which kind you are.",
  }

outro:
  {
    title: "That’s the test.",
    text: "Now you know how we might collaborate. If it made you think, maybe send it to someone who should see it.",
  }

typeStructure:
  [
    { id: trait, label: "Core trait" },
    { id: behavior, label: "Primary behavior" },
    { id: energy, label: "Energy type" },
    { id: bring, label: "What you bring" },
    { id: bringOut, label: "What you bring out in me" },
  ]

types:
  [
    {
      id: ac,
      label: The Anchor,
      values:
        [
          { id: trait, value: "Stability" },
          { id: behavior, value: "Follows through, organizes, calms chaos" },
          { id: energy, value: "Grounded" },
          { id: bring, value: "Structure, accountability, quiet confidence" },
          {
            id: bringOut,
            value: "With you, I relax, trust, and move with intention.",
          },
        ],
    },
    {
      id: sp,
      label: The Spark,
      values:
        [
          { id: trait, value: "Momentum" },
          { id: behavior, value: "Energizes teams, shares early, improvises" },
          { id: energy, value: "Expansive" },
          { id: bring, value: "Excitement, creativity, momentum" },
          {
            id: bringOut,
            value: "I think faster. I share sooner. I laugh more.",
          },
        ],
    },
    {
      id: "tn",
      label: "The Tension",
      values:
        [
          { id: "trait", value: "Challenge" },
          {
            id: "behavior",
            value: "Pushes back, sharpens quality, questions choices",
          },
          { id: "energy", value: "Intense" },
          { id: bring, value: "High standards, friction, elevation" },
          {
            id: bringOut,
            value: "I level up. I stop coasting. I get sharper.",
          },
        ],
    },
  ]

questions:
  [
    {
      "id": "question-1",
      "title": "Question 1",
      "answers":
        [
          { "type": "ac", "label": "Answer label 1" },
          { "type": "sp", "label": "Answer label 2" },
          { "type": "tn", "label": "Answer label 3" },
        ],
    },
    {
      "id": "question-2",
      "title": "Question 2",
      "answers":
        [
          { "type": "ac", "label": "Answer label 1" },
          { "type": "sp", "label": "Answer label 2" },
          { "type": "tn", "label": "Answer label 3" },
        ],
    },
    {
      "id": "question-3",
      "title": "Question 3",
      "answers":
        [
          { "type": "ac", "label": "Answer label 1" },
          { "type": "sp", "label": "Answer label 2" },
          { "type": "tn", "label": "Answer label 3" },
        ],
    },
  ]
---
