import React, { useMemo } from "react";
import { structure } from "./config/structure";
import { variableDescriptions } from "./config/variableDescriptions";

const taskToVarMap = {
  "Bird Alligator": "birdalligator",
  "Grass Snow": "grasssnow",
  "Mother Executive Function Tests": "mef_",
  "Adult Temperament Questionnaire": "atq",
  "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)":
    "brief",
  "Changes + Adjustments Questionnaire": "chg",
  "Child Behavior Checklist": "cbcl",
  "Child Behavior Questionnaire": "cbq",
  "Child-Rearing Practices Report": "crpr",
  "Children’s Sleep Habits Questionnaire": "cshq",
  "CHAOS Scale (Confusion, Hubbub, and Order Scale)": "chaos",
  "Depression Scale": "dep",
  "DIFFER Cognitive Ability": "diff",
  "Eyberg Child Behavior Inventory": "eyb",
  "Physical Health Status Inventory": "phsi",
  "Shipley Parent Cognition": "ship",
  "Teacher Questionnaires": "teach",
  "Temperament Questionnaires": "temp",
  Compliments: "comp",
  "Door Opening": "door",
  "Fruit Stroop": "fruit",
  "Parental Control": "control",
  "Snack Delay": "snack",
  "Sustained Attention": "sustain",
  "Token Sort": "token",
  "Main Sleep Variables": "sleep",
  "Home Scale Items": "home",
  "Observer Ratings": "obs",
  "Parent Positive Affect": "parentpositive",
  "Sleep Diary – Child": "sdc",
  "Gift Delay": "gift",
  "Stop-Go": "stop",
  "Toy Frustration": "toyfrustration",
  "Child Behavior FP": "cbfp",
  "Child Positive Affect": "childpositivetoy",
  "Child Negative Affect": "childnegativetoy",
  "Broken Toy Related": "brokentoy",
  "Child Compliance / Toy Clean Up": "childcompliancetoycleanup",
  "Toy Prohibition": "childbehaviortoyprohibition",
  "Child Demand / Toy Prohibition": "childdemandtoyprohibition",
  "Other Related Toy Variables": "toy",
  "EEG Bird Alligator": "eegbirdalligator",
};

export const getCorrectTasksForVariable = (v) => {
  const vLower = v.toLowerCase();

  if (
    vLower.startsWith("complimentschildpresent") ||
    vLower.startsWith("complimentsparentpresent") ||
    vLower.startsWith("complimentsembarrassment") ||
    vLower.startsWith("complimentsshame") ||
    vLower.startsWith("complimentspride") ||
    vLower.startsWith("complimentsselfawareness")
  ) {
    return ["Compliments"];
  }
  if (vLower.includes("compliments")) {
    return ["Compliments"];
  }

  if (vLower.startsWith("brief")) {
    return [
      "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)",
      "Mother Executive Function Tests",
    ];
  }

  if (vLower.startsWith("toh") || vLower.startsWith("wcst") || vLower.startsWith("exp24")) {
    return ["Mother Executive Function Tests"];
  }

  if (vLower.startsWith("parentalcontroltoycleanup")) {
    return ["Parental Control"];
  }

  if (vLower.startsWith("parentpositivetoycleanup")) {
    return ["Parent Positive Affect"];
  }

  // Sleep observation counts (Observer Ratings vs Main Sleep Variables)
  if (
    vLower === "downnumobs" || vLower === "upnumobs" || vLower === "truesleepnumobs" || vLower === "napnumobs" ||
    vLower === "downshorttime" || vLower === "upshorttime" || vLower === "truesleepshorttime" || vLower === "napshorttime" ||
    vLower.startsWith("downnumobs") || vLower.startsWith("upnumobs") || vLower.startsWith("truesleepnumobs") || vLower.startsWith("napnumobs") ||
    vLower.startsWith("downshorttime") || vLower.startsWith("upshorttime") || vLower.startsWith("truesleepshorttime") || vLower.startsWith("napshorttime")
  ) {
    return ["Main Sleep Variables", "Observer Ratings"];
  }

  // Sleep Diary – Child (primary for sleep diary variables)
  if (vLower.includes("sdchild")) {
    return ["Sleep Diary – Child"];
  }

  if (
    vLower.startsWith("upsleep") ||
    vLower.startsWith("downsleep") ||
    vLower.startsWith("truesleep") ||
    vLower.startsWith("napsleep") ||
    vLower.startsWith("sleepconsolidation") ||
    vLower.startsWith("sleepactivity") ||
    vLower.startsWith("sleepvariability") ||
    vLower.startsWith("sleepduration") ||
    vLower.startsWith("sleeptiming") ||
    vLower.startsWith("activitymean") ||
    vLower.startsWith("activitymedian") ||
    vLower.startsWith("activitysd") ||
    vLower.startsWith("wakeminutes") ||
    vLower.startsWith("sleepefficiency") ||
    vLower.startsWith("sleeplatency") ||
    vLower.startsWith("longwakeepisodes") ||
    vLower.startsWith("longestwakeepisode") ||
    vLower.startsWith("starttimehours") ||
    vLower.startsWith("midtimehours") ||
    vLower.startsWith("endtimehours") ||
    vLower.startsWith("duration") ||
    vLower.startsWith("numobs") ||
    vLower.startsWith("shorttimeinbed") ||
    vLower.startsWith("shorttimeasleep") ||
    vLower.includes("upsleep") ||
    vLower.includes("downsleep") ||
    vLower.includes("truesleep") ||
    vLower.includes("napsleep") ||
    vLower.includes("sleepconsolidation") ||
    vLower.includes("sleepactivity") ||
    vLower.includes("sleepvariability") ||
    vLower.includes("sleepduration") ||
    vLower.includes("sleeptiming") ||
    vLower.includes("activitymean") ||
    vLower.includes("activitymedian") ||
    vLower.includes("activitysd") ||
    vLower.includes("wakeminutes") ||
    vLower.includes("sleepefficiency") ||
    vLower.includes("sleeplatency") ||
    vLower.includes("longwakeepisodes") ||
    vLower.includes("longestwakeepisode") ||
    vLower.includes("starttimehours") ||
    vLower.includes("midtimehours") ||
    vLower.includes("endtimehours") ||
    vLower.includes("duration") ||
    vLower.includes("numobs") ||
    vLower.includes("shorttimeinbed") ||
    vLower.includes("shorttimeasleep")
  ) {
    return ["Main Sleep Variables"];
  }

  if (vLower.startsWith("atq")) {
    return ["Adult Temperament Questionnaire"];
  }

  if (vLower.startsWith("cbcl")) {
    return ["Child Behavior Checklist"];
  }

  if (vLower.startsWith("cbq")) {
    return ["Child Behavior Questionnaire"];
  }

  // Depression Scale (ONLY cesdDepressiveSymptoms and cesdDepressionDiagnosis)
  if (vLower.startsWith("cesddepressivesymptoms") || vLower.startsWith("cesddepressiondiagnosis")) {
    return ["Depression Scale"];
  }

  if (
    vLower.startsWith("classteacherinput") ||
    vLower.startsWith("classteachersensitivity") ||
    vLower.startsWith("teacherchecklist") ||
    vLower.startsWith("teacherdemographics") ||
    vLower.startsWith("trf")
  ) {
    return ["Teacher Questionnaires"];
  }

  if (vLower.startsWith("icq") && !vLower.startsWith("icqdifficult")) {
    return ["Temperament Questionnaires"];
  }

  if (
    vLower.startsWith("oddball") ||
    vLower.startsWith("fishsharks") ||
    vLower.startsWith("icqdifficult") ||
    (vLower.startsWith("preschooldemographics") && !vLower.startsWith("preschooldemographicssibling"))
  ) {
    return ["DIFFER Cognitive Ability"];
  }

  if (
    vLower.startsWith("homescaleitems") ||
    vLower.startsWith("homebehaviorscale") ||
    vLower.startsWith("blh") || // blh, blhc, blhcOutdoorSum
    vLower.startsWith("hv2securityhomeenvironment") ||
    vLower.startsWith("preschooldemographicssibling") ||
    vLower.startsWith("firsthomevisitdate") ||
    vLower.startsWith("secondhomevisitdate")
  ) {
    return ["Home Scale Items"];
  }

  if (vLower.startsWith("observerimpression") || vLower.startsWith("postobservation")) {
    return ["Observer Ratings"];
  }

  if (vLower.startsWith("parentpositive")) {
    return ["Parent Positive Affect"];
  }

  if (vLower.startsWith("shipley") || vLower.startsWith("socialsupport")) {
    return ["Shipley Parent Cognition"];
  }

  if (vLower.startsWith("chaos")) {
    return ["CHAOS Scale (Confusion, Hubbub, and Order Scale)"];
  }

  if (vLower.startsWith("eyberg") || vLower.startsWith("ecbi")) {
    return ["Eyberg Child Behavior Inventory"];
  }

  if (vLower.startsWith("childbehaviorfreeplay")) {
    return ["Child Behavior FP"];
  }

  if (vLower.includes("parentalsensitivity") || vLower.includes("parentalintrusiveness")) {
    return ["Parent Sensitivity / Intrusiveness"];
  }

  if (vLower.startsWith("maternalleavetaking")) {
    return ["Maternal Leave Taking"];
  }

  if (vLower.startsWith("childpositivetoy")) {
    return ["Child Positive Affect"];
  }

  if (vLower.startsWith("childnegativetoy")) {
    return ["Child Negative Affect"];
  }

  if (vLower.startsWith("brokentoy")) {
    return ["Broken Toy Related"];
  }

  if (vLower.startsWith("childcompliancetoycleanup")) {
    return ["Child Compliance / Toy Clean Up"];
  }

  if (vLower.startsWith("childbehaviortoyprohibition")) {
    return ["Toy Prohibition"];
  }

  if (vLower.startsWith("childdemandtoyprohibition")) {
    return ["Child Demand / Toy Prohibition"];
  }

  if (vLower.startsWith("toyfrustration")) {
    return ["Toy Frustration"];
  }

  if (vLower.startsWith("toy") || vLower.includes("toy")) {
    return ["Other Related Toy Variables"];
  }

  if (vLower.startsWith("parentalcontrol")) {
    return ["Parental Control"];
  }

  if (vLower.startsWith("fruitstroop")) {
    return ["Fruit Stroop"];
  }

  if (vLower.includes("eegbirdalligator")) {
    return ["EEG Bird Alligator"];
  }

  if (vLower.startsWith("birdalligator")) {
    return ["Bird Alligator"];
  }

  if (vLower.startsWith("grasssnow")) {
    return ["Grass Snow"];
  }

  if (vLower.startsWith("giftdelay")) {
    return ["Gift Delay"];
  }

  if (vLower.startsWith("snackdelay")) {
    return ["Snack Delay"];
  }

  if (vLower.startsWith("stopgo")) {
    return ["Stop-Go"];
  }

  if (vLower.startsWith("sustainedattention")) {
    return ["Sustained Attention"];
  }

  if (vLower.startsWith("tokensort")) {
    return ["Token Sort"];
  }

  if (vLower.startsWith("walkline") || vLower.startsWith("walkaline")) {
    return ["Walk a Line"];
  }

  if (vLower.startsWith("whisper")) {
    return ["Whisper"];
  }

  if (vLower.startsWith("dooropening")) {
    return ["Door Opening"];
  }

  if (vLower.startsWith("father")) {
    return ["Father Questionnaires"];
  }

  return [];
};

export const shouldShowVariableInTask = (variableName, selectedCategory, selectedTask) => {
  if (!selectedTask) return false;

  const normalized = variableName.trim();
  if (normalized === "tcid") return false;

  const correctTasks = getCorrectTasksForVariable(normalized);

  if (correctTasks && correctTasks.length > 0) {
    if (correctTasks.includes(selectedTask)) {
      return true;
    }
    const allTasksInSystem = new Set(Object.values(structure.tasksByCategory).flat());
    if (correctTasks.includes("Sleep Diary – Child") && selectedTask === "Main Sleep Variables") {
      return false;
    }
    const anyCorrectTaskExists = correctTasks.some((t) => allTasksInSystem.has(t));
    if (anyCorrectTaskExists) {
      return false;
    }
  }

  if (selectedTask === "Parent Sensitivity / Intrusiveness") {
    const lower = normalized.toLowerCase();
    return lower.includes("parentalsensitivity") || lower.includes("parentalintrusiveness");
  }

  const keyword = taskToVarMap[selectedTask] || selectedTask.toLowerCase().split(" ")[0];
  return normalized.toLowerCase().includes(keyword.toLowerCase());
};

export const getFinalVariables = (filteredVariables, selectedCategory, selectedTask) => {
  if (!filteredVariables) return [];
  const trimmed = filteredVariables.map((v) => v.trim());
  const unique = [...new Set(trimmed)];
  return unique.filter((v) => shouldShowVariableInTask(v, selectedCategory, selectedTask));
};

export const countDisplayedVariables = (groups) => {
  if (!groups) return 0;
  let count = 0;
  if (Array.isArray(groups)) {
    return groups.length;
  }
  if (typeof groups === "object") {
    for (const key in groups) {
      count += countDisplayedVariables(groups[key]);
    }
  }
  return count;
};

export const getVariableGroup = (variableName, selectedCategory, selectedTask) => {
  const v = variableName.trim();
  const vLower = v.toLowerCase();

  // 1. Compliments
  if (selectedTask === "Compliments") {
    const isComplimentVar =
      vLower.startsWith("complimentschildpresent") ||
      vLower.startsWith("complimentsparentpresent") ||
      vLower.startsWith("complimentsembarrassment") ||
      vLower.startsWith("complimentsshame") ||
      vLower.startsWith("complimentspride") ||
      vLower.startsWith("complimentsselfawareness");
    if (isComplimentVar) {
      let l2 = "Other";
      if (vLower.endsWith("30")) l2 = "Age 30";
      else if (vLower.endsWith("36")) l2 = "Age 36";
      else if (vLower.endsWith("42")) l2 = "Age 42";
      else if (vLower.endsWith("54")) l2 = "Age 54";
      // No mean suffix for compliments variables per spec
      return { l1Category: "Compliments Task Variables", l2Timepoint: l2 };
    }
    // Anything else goes to review group
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 2. Toy Frustration
  if (selectedTask === "Toy Frustration") {
    const l1 = "Toy Frustration Task";
    if (vLower.startsWith("toyfrustration")) {
      return { l1Category: l1, l2Timepoint: "Toy Frustration Variables" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 3. Parental Control
  if (selectedTask === "Parental Control") {
    if (vLower.startsWith("parentalcontrol") || vLower.startsWith("parentalcontroltoycleanup")) {
      return { l1Category: "Parental Control Task", l2Timepoint: "Parental Control Variables" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 4. Mother Executive Function Tests
  if (selectedTask === "Mother Executive Function Tests") {
    const l1 = "Mother Executive Function Tests";
    if (vLower.startsWith("brief")) {
      return { l1Category: l1, l2Timepoint: "BRIEF Related" };
    }
    if (vLower.startsWith("toh")) {
      return { l1Category: l1, l2Timepoint: "Tower of Hanoi / TOH Related" };
    }
    if (vLower.startsWith("wcst")) {
      return { l1Category: l1, l2Timepoint: "WCST Related" };
    }
    if (vLower.startsWith("exp24")) {
      return { l1Category: l1, l2Timepoint: "Executive Function Composite" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 5. DIFFER Cognitive Ability
  if (selectedTask === "DIFFER Cognitive Ability") {
    const l1 = "DIFFER Cognitive Ability";
    if (vLower.startsWith("oddball")) {
      return { l1Category: l1, l2Timepoint: "Oddball Related" };
    }
    if (vLower.startsWith("birdalligator")) {
      return { l1Category: l1, l2Timepoint: "Bird Alligator Related" };
    }
    if (vLower.startsWith("fishsharks")) {
      return { l1Category: l1, l2Timepoint: "Fish Sharks Related" };
    }
    if (vLower.startsWith("icqdifficult")) {
      return { l1Category: l1, l2Timepoint: "ICQ Difficult Related" };
    }
    if (vLower.startsWith("preschooldemographics")) {
      return { l1Category: l1, l2Timepoint: "Preschool Demographics Related" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 6. Home Scale Items
  if (selectedTask === "Home Scale Items") {
    const l1 = "Home Scale Items";
    if (vLower.startsWith("homescaleitems")) {
      return { l1Category: l1, l2Timepoint: "HOME Scale Items" };
    }
    if (vLower.startsWith("homebehaviorscale")) {
      return { l1Category: l1, l2Timepoint: "Home Behavior Scale" };
    }
    if (vLower.startsWith("blh") || vLower.startsWith("blhc")) {
      return { l1Category: l1, l2Timepoint: "Home Confusion / Disorganization" };
    }
    if (vLower.startsWith("hv2securityhomeenvironment")) {
      return { l1Category: l1, l2Timepoint: "Home Environment Security" };
    }
    if (vLower.startsWith("preschooldemographicssibling")) {
      return { l1Category: l1, l2Timepoint: "Preschool Sibling Demographics" };
    }
    if (vLower.startsWith("firsthomevisitdate") || vLower.startsWith("secondhomevisitdate")) {
      return { l1Category: l1, l2Timepoint: "Home Visit Dates" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 7. Observer Ratings
  if (selectedTask === "Observer Ratings") {
    const l1 = "Observer Ratings";
    if (
      vLower === "downnumobs" || vLower === "upnumobs" || vLower === "truesleepnumobs" || vLower === "napnumobs" ||
      vLower === "downshorttime" || vLower === "upshorttime" || vLower === "truesleepshorttime" || vLower === "napshorttime" ||
      vLower.startsWith("downnumobs") || vLower.startsWith("upnumobs") || vLower.startsWith("truesleepnumobs") || vLower.startsWith("napnumobs") ||
      vLower.startsWith("downshorttime") || vLower.startsWith("upshorttime") || vLower.startsWith("truesleepshorttime") || vLower.startsWith("napshorttime")
    ) {
      return { l1Category: l1, l2Timepoint: "Sleep Observation Counts" };
    }
    if (vLower.startsWith("observerimpression") || vLower.startsWith("postobservation")) {
      return { l1Category: l1, l2Timepoint: "Observer Ratings" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 8. Shipley Parent Cognition
  if (selectedTask === "Shipley Parent Cognition") {
    const l1 = "Shipley Parent Cognition";
    if (vLower.startsWith("shipley")) {
      return { l1Category: l1, l2Timepoint: "Shipley Parent Cognition" };
    }
    if (vLower.startsWith("socialsupport")) {
      return { l1Category: l1, l2Timepoint: "Social Support Related" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  // 9. Main Sleep Variables (Actigraphy)
  if (selectedTask === "Main Sleep Variables") {
    const l1 = "Main Sleep Variables";
    const isColeKripke = vLower.includes("cole") || vLower.includes("kripke");
    const isSadeh = vLower.includes("sadeh");
    const isWk1 = vLower.includes("wk1") || vLower.includes("week1") || vLower.includes("w1");
    const isWk2 = vLower.includes("wk2") || vLower.includes("week2") || vLower.includes("w2");
    const isComb = vLower.includes("comb") || vLower.includes("combined");
    const isParent = vLower.includes("par") || vLower.includes("parent");

    if (isSadeh) {
      if (isWk1 && !isParent) return { l1Category: l1, l2Timepoint: "Child Week 1 Sadeh" };
      if (isWk2 && !isParent) return { l1Category: l1, l2Timepoint: "Child Week 2 Sadeh" };
      if (isComb && !isParent) return { l1Category: l1, l2Timepoint: "Child Combined Sadeh" };
      if (isParent) return { l1Category: l1, l2Timepoint: "Parent Combined Sadeh" };
    } else if (isColeKripke) {
      if (isWk1 && !isParent) return { l1Category: l1, l2Timepoint: "Child Week 1 ColeKripke" };
      if (isWk2 && !isParent) return { l1Category: l1, l2Timepoint: "Child Week 2 ColeKripke" };
      if (isComb && !isParent) return { l1Category: l1, l2Timepoint: "Child Combined ColeKripke" };
      if (isWk1 && isParent) return { l1Category: l1, l2Timepoint: "Parent Week 1 ColeKripke" };
      if (isWk2 && isParent) return { l1Category: l1, l2Timepoint: "Parent Week 2 ColeKripke" };
      if (isComb && isParent) return { l1Category: l1, l2Timepoint: "Parent Combined ColeKripke" };
    }

    if (vLower.includes("domain") || vLower.includes("summary") || vLower.includes("consolidation") || vLower.includes("efficiency")) {
      return { l1Category: l1, l2Timepoint: "Summary Sleep Domains" };
    }

    return { l1Category: l1, l2Timepoint: "Summary Sleep Domains" };
  }

  // 10. Bird Alligator (Original grouping)
  if (selectedTask === "Bird Alligator") {
    const l1 = "Bird Alligator Task Variables";

    let l2 = "Other";
    if (vLower.endsWith("30")) l2 = "Age 30";
    else if (vLower.endsWith("36")) l2 = "Age 36";
    else if (vLower.endsWith("42")) l2 = "Age 42";
    else if (vLower.endsWith("54")) l2 = "Age 54";
    else if (vLower.endsWith("mean")) l2 = "Mean";

    return { l1Category: l1, l2Timepoint: l2 };
  }

  // EEG Bird Alligator (new EEG Variables category task)
  if (selectedTask === "EEG Bird Alligator") {
    let l2 = "Other";
    if (vLower.endsWith("30")) l2 = "Age 30";
    else if (vLower.endsWith("36")) l2 = "Age 36";
    else if (vLower.endsWith("42")) l2 = "Age 42";
    else if (vLower.endsWith("54")) l2 = "Age 54";
    else if (vLower.endsWith("mean")) l2 = "Mean";

    return { l1Category: "EEG Bird Alligator Variables", l2Timepoint: l2 };
  }

  if (selectedTask === "Adult Temperament Questionnaire") {
    let l1 = "Adult Temperament Questionnaire Task";
    let l2 = "Other";
    if (vLower.endsWith("30")) l2 = "Age 30";
    else if (vLower.endsWith("36")) l2 = "Age 36";
    else if (vLower.endsWith("42")) l2 = "Age 42";
    else if (vLower.endsWith("54")) l2 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2 };
  }

  // Parent Sensitivity / Intrusiveness: group by age, then by Sensitivity / Intrusiveness
  if (selectedTask === "Parent Sensitivity / Intrusiveness") {
    const l1 = `${selectedTask} Task Variables`;
    let l2 = "Other";
    if (vLower.endsWith("30")) l2 = "Age 30";
    else if (vLower.endsWith("36")) l2 = "Age 36";
    else if (vLower.endsWith("42")) l2 = "Age 42";
    else if (vLower.endsWith("54")) l2 = "Age 54";

    const l3 = vLower.includes("parentalsensitivity") ? "Sensitivity" : "Intrusiveness";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  // 11. Other tasks with age-based suffix grouping
  const ageTasks = [
    "Grass Snow",
    "Fruit Stroop",
    "Door Opening",
    "Gift Delay",
    "Snack Delay",
    "Stop-Go",
    "Sustained Attention",
    "Token Sort",
    "Walk a Line",
    "Whisper",
    "Maternal Leave Taking",
  ];
  if (ageTasks.includes(selectedTask)) {
    const l1 = `${selectedTask} Task Variables`;
    let l2 = "Other";
    if (vLower.endsWith("30")) l2 = "Age 30";
    else if (vLower.endsWith("36")) l2 = "Age 36";
    else if (vLower.endsWith("42")) l2 = "Age 42";
    else if (vLower.endsWith("54")) l2 = "Age 54";
    else if (vLower.endsWith("mean")) l2 = "Mean";
    return { l1Category: l1, l2Timepoint: l2 };
  }

  // 11. Door Opening (Original grouping)
  if (selectedTask === "Door Opening") {
    if (vLower.startsWith("dooropening")) {
      return { l1Category: "Door Opening Task Variables", l2Timepoint: "All" };
    } else if (vLower.startsWith("blhcoutdoorsum")) {
      return { l1Category: "Associated / External Variables", l2Timepoint: "All" };
    }
    return { l1Category: "Other", l2Timepoint: "All" };
  }

  // Default: Return a generic single L1 category
  const defaultL1 = `${selectedTask} Task`;
  return { l1Category: defaultL1, l2Timepoint: "All" };
};

export const groupVariablesBySubcategory = (variables, selectedCategory, selectedTask) => {
  if (!selectedTask) return null;

  const cleanedVars = [...new Set(variables.map((v) => v.trim()))];

  const groups = {};

  cleanedVars.forEach((v) => {
    const { l1Category, l2Timepoint, l3Group } = getVariableGroup(v, selectedCategory, selectedTask);

    if (!groups[l1Category]) {
      groups[l1Category] = {};
    }

    if (l3Group) {
      if (!groups[l1Category][l2Timepoint]) {
        groups[l1Category][l2Timepoint] = {};
      }
      if (!groups[l1Category][l2Timepoint][l3Group]) {
        groups[l1Category][l2Timepoint][l3Group] = [];
      }
      groups[l1Category][l2Timepoint][l3Group].push(v);
    } else {
      if (!groups[l1Category][l2Timepoint]) {
        groups[l1Category][l2Timepoint] = [];
      }
      groups[l1Category][l2Timepoint].push(v);
    }
  });

  return groups;
};

const VariableDescription = ({
  rawVariables,
  finalVars,
  groupedVars,
  selectedCategory,
  selectedTask,
  selectedVariables,
  checkedVariables,
  setCheckedVariables,
  handleAddVariable,
  setVarInfoModal,
  expandedVarL1,
  expandedVarL2,
  toggleVarL1,
  toggleVarL2,
  toggleRowSelection,
  variableDescriptions,
}) => {
  const listStyle = { listStyle: "none", padding: 0, margin: 0 };

  const renderVariableRow = (v) => {
    const isAdded = selectedVariables.includes(v);
    const isChecked = checkedVariables.includes(v);

    return (
      <div
        key={v}
        onClick={() => !isAdded && toggleRowSelection(v, setCheckedVariables)}
        style={{
          padding: "0.6rem 0.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          cursor: isAdded ? "default" : "pointer",
          backgroundColor: isChecked ? "rgba(59, 130, 246, 0.1)" : "transparent",
          opacity: isAdded ? 0.5 : 1,
          borderRadius: "4px",
          transition: "background-color 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setVarInfoModal(v);
            }}
            title="Variable info"
            style={{
              flexShrink: 0,
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.6rem",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              padding: 0,
              transition: "background 0.2s, border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
            }}
          >
            ?
          </button>
          <span
            style={{
              fontSize: "0.85rem",
              wordBreak: "break-all",
              color: "var(--text-secondary)",
            }}
          >
            {v}
          </span>
        </div>

        <button
          className={isAdded ? "btn-disabled" : "btn-small"}
          disabled={isAdded}
          onClick={(e) => {
            e.stopPropagation();
            handleAddVariable(v);
          }}
          style={{
            padding: "0.2rem 0.4rem",
            fontSize: "0.65rem",
            flexShrink: 0,
          }}
        >
          {isAdded ? "Added" : "Add"}
        </button>
      </div>
    );
  };

  if (!finalVars || finalVars.length === 0) {
    return (
      <p
        style={{
          color: "var(--text-secondary)",
          padding: "1rem",
          fontStyle: "italic",
        }}
      >
        {selectedTask ? "No variables found for this task." : "Select a task to view variables."}
      </p>
    );
  }

  return (
    <ul style={listStyle}>
      {Object.entries(groupedVars).sort((a,b)=>{if(a[0]==='Compliments Task Variables') return -1; if(b[0]==='Compliments Task Variables') return 1; return a[0].localeCompare(b[0]);}).map(([l1Category,l2Groups])=>{
        const totalInL1 = countDisplayedVariables(l2Groups);
        if (totalInL1 === 0) return null;

        const isL1Expanded = expandedVarL1[l1Category] !== false;

        return (
          <div key={l1Category} style={{ marginBottom: "0.75rem" }}>
            <div
              onClick={() => toggleVarL1(l1Category)}
              style={{
                padding: "0.6rem 0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.03)",
                borderBottom: "1px solid var(--glass-border)",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "0.95rem",
                color: "var(--text-primary)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.65rem",
                    opacity: 0.7,
                    transition: "transform 0.2s",
                    display: "inline-block",
                    transform: isL1Expanded ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  ▶
                </span>
                <span>📁 {l1Category}</span>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  background: "var(--glass-border)",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  color: "var(--text-secondary)",
                }}
              >
                {totalInL1}
              </span>
            </div>

            {isL1Expanded && (
              <div style={{ paddingLeft: "0.75rem", marginTop: "0.25rem" }}>
                {Object.entries(l2Groups).map(([l2Timepoint, vars]) => {
                  const totalInL2 = countDisplayedVariables(vars);
                  if (totalInL2 === 0) return null;

                  const l2Key = `${l1Category}-${l2Timepoint}`;
                  const isL2Expanded = expandedVarL2[l2Key] !== false;

                  const varListRenderer = Array.isArray(vars) ? (
                    <div
                      style={{
                        paddingLeft: l2Timepoint === "All" ? "0" : "0.75rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {vars.map(renderVariableRow)}
                    </div>
                  ) : (
                    <div style={{ paddingLeft: "0.75rem", marginTop: "0.2rem" }}>
                      {Object.entries(vars).map(([l3Group, l3Vars]) => {
                        if (l3Vars.length === 0) return null;

                        const l3Key = `${l2Key}-${l3Group}`;
                        const isL3Expanded = expandedVarL2[l3Key] !== false;

                        return (
                          <div key={l3Group} style={{ marginBottom: "0.5rem" }}>
                            <div
                              onClick={() => toggleVarL2(l3Key)}
                              style={{
                                padding: "0.5rem 0.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                background: "rgba(255, 255, 255, 0.01)",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "4px",
                                fontWeight: "500",
                                fontSize: "0.88rem",
                                color: "var(--text-primary)",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span
                                  style={{
                                    fontSize: "0.6rem",
                                    opacity: 0.6,
                                    transition: "transform 0.2s",
                                    display: "inline-block",
                                    transform: isL3Expanded ? "rotate(90deg)" : "rotate(0deg)",
                                  }}
                                >
                                  ▶
                                </span>
                                <span>📁 {l3Group}</span>
                              </div>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  background: "rgba(255,255,255,0.05)",
                                  padding: "1px 6px",
                                  borderRadius: "8px",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                {l3Vars.length}
                              </span>
                            </div>

                            {isL3Expanded && (
                              <div style={{ paddingLeft: "0.75rem", marginTop: "0.2rem" }}>
                                {l3Vars.map(renderVariableRow)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );

                  if (l2Timepoint === "All") {
                    return (
                      <div key={l2Timepoint} style={{ marginBottom: "0.5rem" }}>
                        {varListRenderer}
                      </div>
                    );
                  }

                  return (
                    <div key={l2Timepoint} style={{ marginBottom: "0.5rem" }}>
                      <div
                        onClick={() => toggleVarL2(l2Key)}
                        style={{
                          padding: "0.5rem 0.5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          background: "rgba(255, 255, 255, 0.01)",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                          borderRadius: "4px",
                          fontWeight: "500",
                          fontSize: "0.88rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span
                            style={{
                              fontSize: "0.6rem",
                              opacity: 0.6,
                              transition: "transform 0.2s",
                              display: "inline-block",
                              transform: isL2Expanded ? "rotate(90deg)" : "rotate(0deg)",
                            }}
                          >
                            ▶
                          </span>
                          <span>
                            {selectedTask === "Bird Alligator" ? "📅 " : "📁 "}
                            {l2Timepoint === "Mean" ? "Composites" : l2Timepoint}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            background: "rgba(255,255,255,0.05)",
                            padding: "1px 6px",
                            borderRadius: "8px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {totalInL2}
                        </span>
                      </div>

                      {isL2Expanded && varListRenderer}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default VariableDescription;
