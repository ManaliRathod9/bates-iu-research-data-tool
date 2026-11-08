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
        "Teacher Questionnaires",
        "Temperament Questionnaires",
      ],
    },
    {
      name: "Observations",
      children: ["Observer Questionnaires", "Observer Ratings"],
    },
    { name: "Tests" },
    { name: "EEG Variables" },
    { name: "Actigraphy" },
    { name: "Sleep Measures" },
  ],

  tasksByCategory: {
    "Mother Tasks": [
      "CES-D",
      "Mother Executive Function Tests",
      "Shipley Parent Cognition",
      "Social Support Related"
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
      "Follow the Path",
      "Fruit Stroop",
      "Grass Snow",
      "Gift Delay",
      "BehaviorPhoneCallPlays",
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
      "Child Behavior Phone Call",
      "Child Compliance / Toy Clean Up",
      "Maternal Leave Taking",
      "Parent Positive Affect",
      "Parental Control",
      "Parent Sensitivity / Intrusiveness",
      "Toy Prohibition",
    ],

    "Mother Questionnaires": [
      "Adult Temperament Questionnaire",
      "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)",
      "Changes + Adjustments Questionnaire",
      "Child Behavior Checklist",
      "Child Behavior Questionnaire",
      "Child Misbehavior",
      "Child-Rearing Practices Report",
      "Children's Sleep Habits Questionnaire",
      "CHAOS Scale (Confusion, Hubbub, and Order Scale)",
      "Concerns & Constraints",
      "Daily Schedule",
      "Depression Scale",
      "Eyberg Child Behavior Inventory",
      "Hollingshead Socioeconomic Status",
      "Parenting Events",
      "Parenting Scale",
      "Reilly Role Overload Scale",
      "Response to Misbehavior",
      "Social Competence Scale",
      "Social Support — PANSE",
    ],
    "Secondary Caregiver Questionnaires": [
      "Caregiver-Teacher Report Form (TRF)",
    ],
    "Father Questionnaires": [],

    "Teacher Questionnaires": ["Teacher Demographics", "Class Teacher Sensitivity", "Teacher Checklist", "Mock Report Card"],

    "Temperament Questionnaires": ["Infant Characteristics Questionnaire (ICQ)"],

    "Observer Questionnaires": ["Home Scale Items", "Purdue Home Stimulation Inventory"],

    "Observer Ratings": [
      "Sleep Observation Counts",
      "Observer Impressions - Regular ratings",
      "Post Observation Questionnaire - Child composites",
      "Post Observation Questionnaire - Parent composites",
      "Post Observation Rating Scale - Emotionality composites",
      "Post Observation Rating Scale - Regulation composite",
      "Bates Lab Home Checklist",
    ],

    Tests: ["Differential Ability Scale (DAS)", "Woodcock-Johnson (WJ)"],

    Actigraphy: ["Child", "Parent", "Summary"],

    "Sleep Measures": ["Sleep Diary – Child"],

    "EEG Variables": ["EEG Bird Alligator", "Oddball Related", "Fish Sharks Related"],
  },
};
