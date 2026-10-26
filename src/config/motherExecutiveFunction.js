export const motherExecutiveFunctionGroups = [
  {
    l2: "Composites",
    l3: null,
    families: [
      "mtStroopColorsPerCorrect",
      "mtStroopCongruentPerCorrect",
      "mtStroopIncongruentPerCorrect",
      "mtStroopMixedPerCorrect",
      "mtStroopMixedRTCorrect",
      "mtStroopMixedRTTotal",
    ],
  },
  {
    l2: "Regular / Task Scores",
    l3: "Tower of Hanoi",
    families: [
      "Toh_familiar",
      "Toh_understand",
      "Toh3_complete",
      "Toh3_moves",
      "Toh3_time",
      "Toh5_complete",
      "Toh5_moves",
      "Toh5_time",
    ],
  },
  {
    l2: "Regular / Task Scores",
    l3: "Wisconsin Card Sorting Test (WCST)",
    families: [
      "WCST1_totcorrect",
      "WCST2_toterrors",
      "WCST3_perserveresp",
      "WCST4_perserveerror",
      "WCST5_nonperserverr",
      "WCST6_conceptlevel",
    ],
  },
];

export const motherExecutiveFunctionVariables = new Map(
  motherExecutiveFunctionGroups.flatMap(({ l2, l3, families }) =>
    families.flatMap((family) =>
      ["30", "36", "42", "54"].map((age) => [`${family}${age}`, { l2, l3 }])
    )
  )
);
