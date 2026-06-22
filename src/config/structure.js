export const structure = {
  categories: [
    {
      name: "Lab Tasks",
      children: ["Mother Tasks", "Child Tasks", "Mother / Child Tasks"],
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
    "Mother Tasks": [
      "Mother Executive Function Tests",
      "Shipley Parent Cognition"
    ],
    "Child Tasks": [
      "Bird Alligator",
      "Broken Toy Related",
      "Child Compliance / Toy Clean Up",
      "Child Demand / Toy Prohibition",
      "Child Negative Affect",
      "Child Positive Affect",
      "Compliments",
      "Door Opening",
      "Fruit Stroop",
      "Grass Snow",
      "Gift Delay",
      "Other Related Toy Variables",
      "Parent Positive Affect",
      "Parental Control",
      "Snack Delay",
      "Stop-Go",
      "Sustained Attention",
      "Token Sort",
      "Toy Frustration",
      "Toy Prohibition",
      "Walk a Line",
      "Whisper",
    ],
    "Mother / Child Tasks": [
      "Child Behavior FP",
      "Maternal Leave Taking",
      "Parent Positive Affect",
      "Parental Control",
      "Parent Sensitivity / Intrusiveness",
    ],

    "Mother Questionnaires": [
      "Adult Temperament Questionnaire",
      "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)",
      "Changes + Adjustments Questionnaire",
      "Child Behavior Checklist",
      "Child Behavior Questionnaire",
      "Child-Rearing Practices Report",
      "Children's Sleep Habits Questionnaire",
      "CHAOS Scale (Confusion, Hubbub, and Order Scale)",
      "Depression Scale",
      "DIFFER Cognitive Ability",
      "Eyberg Child Behavior Inventory",
      "Physical Health Status Inventory",
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
