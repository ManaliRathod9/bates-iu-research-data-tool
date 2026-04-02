export const structure = {
  categories: [
    {
      name: "Lab Tasks",
      children: ["Mother Tasks", "Child Tasks"],
    },
    {
      name: "Questionnaires",
      children: [
        "Mother Questionnaires",
        "Secondary Caregiver Questionnaires",
        "Father Questionnaires",
      ],
    },
    {
      name: "Observations",
      children: ["Observer Questionnaires", "Narratives"],
    },
    { name: "Actigraphy" },
    { name: "Sleep Measures" },
  ],

  tasksByCategory: {
    "Mother Tasks": ["Mother Executive Function Tests"],
    "Child Tasks": [
      "Bird Alligator",
      "Compliments",
      "Door Opening",
      "Fruit Stroop",
      "Grass Snow",
      "Gift Delay",
      "Parental Control",
      "Snack Delay",
      "Stop-Go",
      "Sustained Attention",
      "Token Sort",
      "Toy Frustration",
      "Walk a Line",
      "Whisper",
    ],

    "Mother Questionnaires": [
      "Adult Temperament Questionnaire",
      "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)",
      "Changes + Adjustments Questionnaire",
      "Child Behavior Checklist",
      "Child Behavior FP",
      "Child Behavior Questionnaire",
      "Child-Rearing Practices Report",
      "Children's Sleep Habits Questionnaire",
      "CHAOS Scale (Confusion, Hubbub, and Order Scale)",
      "Depression Scale",
      "DIFFER Cognitive Ability",
      "Eyberg Child Behavior Inventory",
      "Parent Positive Affect",
      "Physical Health Status Inventory",
      "Shipley Parent Cognition",
    ],
    "Secondary Caregiver Questionnaires": [
      "Teacher Questionnaires",
      "Temperament Questionnaires",
    ],
    "Father Questionnaires": [],

    "Observer Questionnaires": ["Home Scale Items", "Observer Ratings"],
    Narratives: [],

    Actigraphy: ["Main Sleep Variables"],

    "Sleep Measures": ["Sleep Diary – Child"],
  },
};
