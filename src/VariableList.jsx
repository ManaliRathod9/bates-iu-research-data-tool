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
  "Eyberg Child Behavior Inventory": "ecbi",
  "Physical Health Status Inventory": "phsi",
  "Shipley Parent Cognition": "shipley",
  "Social Support Related": "socialsupport",
  "Teacher Questionnaires": "teach",
  "Temperament Questionnaires": "temp",
  Compliments: "comp",
  "Door Opening": "door",
  "Fruit Stroop": "fruit",
  "Parental Control": "control",
  "Snack Delay": "snack",
  "Sustained Attention": "sustain",
  "Token Sort": "token",
  Child: "sleep",
  Parent: "sleep",
  Summary: "sleep",
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
  "BehaviorPhoneCallPlays": "toy",
  "EEG Bird Alligator": "eegbirdalligator",
};

const classifySleepVariable = (vLower) => {
  const isColeKripke = vLower.includes("cole") || vLower.includes("kripke");
  const isSadeh = vLower.includes("sadeh");
  const isWk1 = vLower.includes("wk1") || vLower.includes("week1") || vLower.includes("w1");
  const isWk2 = vLower.includes("wk2") || vLower.includes("week2") || vLower.includes("w2");
  const isComb = vLower.includes("comb") || vLower.includes("combined");
  const isParent = vLower.includes("par") || vLower.includes("parent");

  if (isSadeh) {
    if (isWk1 && !isParent) return { task: "Child", l2: "Child Week 1 Sadeh" };
    if (isWk2 && !isParent) return { task: "Child", l2: "Child Week 2 Sadeh" };
    if (isComb && !isParent) return { task: "Child", l2: "Child Combined Sadeh" };
    if (isParent) return { task: "Parent", l2: "Parent Combined Sadeh" };
  } else if (isColeKripke) {
    if (isWk1 && !isParent) return { task: "Child", l2: "Child Week 1 ColeKripke" };
    if (isWk2 && !isParent) return { task: "Child", l2: "Child Week 2 ColeKripke" };
    if (isComb && !isParent) return { task: "Child", l2: "Child Combined ColeKripke" };
    if (isWk1 && isParent) return { task: "Parent", l2: "Parent Week 1 ColeKripke" };
    if (isWk2 && isParent) return { task: "Parent", l2: "Parent Week 2 ColeKripke" };
    if (isComb && isParent) return { task: "Parent", l2: "Parent Combined ColeKripke" };
  }

  return { task: "Summary", l2: "Summary Sleep Domains" };
};

const isSleepObservationCountVariable = (vLower) =>
  vLower === "downnumobs" || vLower === "upnumobs" || vLower === "truesleepnumobs" || vLower === "napnumobs" ||
  vLower === "downshorttime" || vLower === "upshorttime" || vLower === "truesleepshorttime" || vLower === "napshorttime" ||
  vLower.startsWith("downnumobs") || vLower.startsWith("upnumobs") || vLower.startsWith("truesleepnumobs") || vLower.startsWith("napnumobs") ||
  vLower.startsWith("downshorttime") || vLower.startsWith("upshorttime") || vLower.startsWith("truesleepshorttime") || vLower.startsWith("napshorttime");

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

  if (isSleepObservationCountVariable(vLower)) {
    return [classifySleepVariable(vLower).task, "Observer Ratings"];
  }

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
    return [classifySleepVariable(vLower).task];
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
    vLower.startsWith("blh") ||
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

  if (vLower.startsWith("shipley")) {
    return ["Shipley Parent Cognition"];
  }

  if (vLower.startsWith("socialsupport")) {
    return ["Social Support Related"];
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
    return ["BehaviorPhoneCallPlays"];
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
    const anyCorrectTaskExists = correctTasks.some((t) => allTasksInSystem.has(t));
    if (anyCorrectTaskExists) {
      return false;
    }
  }

  if (selectedTask === "Parent Sensitivity / Intrusiveness") {
    const lower = normalized.toLowerCase();
    return lower.includes("parentalsensitivity") || lower.includes("parentalintrusiveness");
  }

  if (selectedTask === "Child" || selectedTask === "Parent" || selectedTask === "Summary") {
    const lower = normalized.toLowerCase();
    if (!lower.includes("sleep")) return false;
    return classifySleepVariable(lower).task === selectedTask;
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

  if (selectedTask === "Compliments") {
    const isComposite = vLower.startsWith("complimentsselfawareness");
    const isRegular =
      vLower.startsWith("complimentschildpresent") ||
      vLower.startsWith("complimentsparentpresent") ||
      vLower.startsWith("complimentsembarrassment") ||
      vLower.startsWith("complimentsshame") ||
      vLower.startsWith("complimentspride");
    if (isRegular || isComposite) {
      let age = "Other";
      if (vLower.endsWith("30")) age = "Age 30";
      else if (vLower.endsWith("36")) age = "Age 36";
      else if (vLower.endsWith("42")) age = "Age 42";
      else if (vLower.endsWith("54")) age = "Age 54";
      if (isComposite) {
        return { l1Category: "Composites", l2Timepoint: age };
      }
      return {
        l1Category: "Compliments Task Variables",
        l2Timepoint: "Regular Variables",
        l3Group: age,
      };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

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

  if (selectedTask === "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version)") {
    const l1 = `${selectedTask} Task`;
    const regularFamilies = [
      "briefinconsistencyvalidity",
      "briefinfrequencyvalidity",
      "briefnegativityvalidity",
      "briefishighlynegative",
    ];
    const l2 = regularFamilies.some((f) => vLower.startsWith(f)) ? "Regular Variables" : "Composites";

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Child Behavior Checklist") {
    const l1 = "Child Behavior Checklist Task";
    let l2 = "Other";
    if (vLower.includes("parentingpartner")) l2 = "Parenting Partner";
    else if (vLower.includes("secondary")) l2 = "Secondary Caregiver";
    else if (vLower.includes("primary")) l2 = "Primary Caregiver";

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Child Behavior Questionnaire") {
    const l1 = "Child Behavior Questionnaire Task";
    const regularFamilies = ["cbq55", "cbq15"];
    const l2 = regularFamilies.some((f) => vLower.startsWith(f)) ? "Regular Variables" : "Composites";

    let l3 = "Other";
    if (vLower.includes("parentingpartner")) l3 = "Parenting Partner";
    else if (vLower.includes("secondary")) l3 = "Secondary Caregiver";
    else if (vLower.includes("primary")) l3 = "Primary Caregiver";

    let l4 = "Other";
    if (vLower.endsWith("30")) l4 = "Age 30";
    else if (vLower.endsWith("36")) l4 = "Age 36";
    else if (vLower.endsWith("42")) l4 = "Age 42";
    else if (vLower.endsWith("54")) l4 = "Age 54";

    return { l1Category: l1, l2Timepoint: l2, l3Group: l3, l4Group: l4 };
  }

  if (selectedTask === "Child-Rearing Practices Report") {
    const l1 = "Child-Rearing Practices Report Task";

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    return { l1Category: l1, l2Timepoint: "Composites", l3Group: l3 };
  }

  if (selectedTask === "Depression Scale") {
    const l1 = "Depression Scale Task";

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    return { l1Category: l1, l2Timepoint: "Composites", l3Group: l3 };
  }

  if (selectedTask === "Eyberg Child Behavior Inventory") {
    const l1 = "Eyberg Child Behavior Inventory Task";

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    return { l1Category: l1, l2Timepoint: "Composites", l3Group: l3 };
  }

  if (selectedTask === "CHAOS Scale (Confusion, Hubbub, and Order Scale)") {
    const l1 = `${selectedTask} Task`;

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    return { l1Category: l1, l2Timepoint: "Composites", l3Group: l3 };
  }

  if (selectedTask === "DIFFER Cognitive Ability") {
    const l1 = "DIFFER Cognitive Ability";

    let age = "Other";
    if (vLower.endsWith("30")) age = "Age 30";
    else if (vLower.endsWith("36")) age = "Age 36";
    else if (vLower.endsWith("42")) age = "Age 42";
    else if (vLower.endsWith("54")) age = "Age 54";

    if (vLower.startsWith("oddball")) {
      return { l1Category: l1, l2Timepoint: "Oddball Related", l3Group: age };
    }
    if (vLower.startsWith("birdalligator")) {
      return { l1Category: l1, l2Timepoint: "Bird Alligator Related", l3Group: age };
    }
    if (vLower.startsWith("fishsharks")) {
      return { l1Category: l1, l2Timepoint: "Fish Sharks Related", l3Group: age };
    }
    if (vLower.startsWith("icqdifficult")) {
      if (vLower.includes("mean")) {
        return {
          l1Category: l1,
          l2Timepoint: "ICQ Difficult Related",
          l3Group: "ICQ Longitudinal Means",
        };
      }
      return {
        l1Category: l1,
        l2Timepoint: "ICQ Difficult Related",
        l3Group: "ICQ Composites",
        l4Group: age,
      };
    }
    if (vLower.startsWith("preschooldemographics")) {
      return { l1Category: l1, l2Timepoint: "Preschool Demographics Related", l3Group: age };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

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

  if (selectedTask === "Shipley Parent Cognition") {
    const l1 = "Shipley Parent Cognition";
    if (vLower.startsWith("shipley")) {
      const isRegular =
        vLower.startsWith("shipleyp.gender") ||
        vLower.startsWith("shipleyp.age") ||
        vLower.startsWith("shipleyp.edu") ||
        vLower.startsWith("shipleyp.occupation");
      const l2 = isRegular ? "Regular Variables" : "Composites";

      let l3 = "Other";
      if (vLower.endsWith("30")) l3 = "Age 30";
      else if (vLower.endsWith("36")) l3 = "Age 36";
      else if (vLower.endsWith("42")) l3 = "Age 42";
      else if (vLower.endsWith("54")) l3 = "Age 54";

      return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  if (selectedTask === "Social Support Related") {
    const l1 = "Social Support Related Task Variables";
    if (vLower.startsWith("socialsupport")) {
      return { l1Category: l1, l2Timepoint: "Composites" };
    }
    return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
  }

  if (selectedTask === "Child" || selectedTask === "Parent" || selectedTask === "Summary") {
    const result = classifySleepVariable(vLower);
    if (result.task !== selectedTask) {
      return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
    }

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    if (selectedTask === "Summary") {
      return { l1Category: selectedTask, l2Timepoint: result.l2, l3Group: l3 };
    }

    const l4 = isSleepObservationCountVariable(vLower) ? "Observation Count Variables" : "Sleep Variables";
    return { l1Category: selectedTask, l2Timepoint: result.l2, l3Group: l3, l4Group: l4 };
  }

  if (selectedTask === "Bird Alligator") {
    const l1 = "Bird Alligator Task Variables";

    if (vLower.endsWith("mean")) {
      return { l1Category: l1, l2Timepoint: "Composites" };
    }

    let l2;
    if (vLower.includes("imputed")) {
      l2 = "Imputed Composites";
    } else if (
      vLower.startsWith("birdalligatorgoxnogo") ||
      vLower.startsWith("birdalligatorinhibition")
    ) {
      l2 = "Behavioral Composites";
    } else {
      l2 = "Regular Variables";
    }

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

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
    const l1 = "Adult Temperament Questionnaire Task";
    const l2 = vLower.includes("parentingpartner") ? "Regular Variables" : "Composites";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

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

  if (selectedTask === "Teacher Questionnaires") {
    const l1 = "Teacher Questionnaires Task";

    let l2 = "Regular Variables";
    let l3 = "Teacher Demographics";
    if (vLower.startsWith("teacherchecklist")) {
      l2 = "Composites";
      l3 = "Teacher Checklist";
    } else if (vLower.startsWith("class")) {
      l3 = "Class";
    }

    let l4 = "Other";
    if (vLower.endsWith("30")) l4 = "Age 30";
    else if (vLower.endsWith("36")) l4 = "Age 36";
    else if (vLower.endsWith("42")) l4 = "Age 42";
    else if (vLower.endsWith("54")) l4 = "Age 54";

    return { l1Category: l1, l2Timepoint: l2, l3Group: l3, l4Group: l4 };
  }

  if (selectedTask === "Parent Positive Affect") {
    const l1 = "Parent Positive Affect Task Variables";
    let l2;
    if (vLower.startsWith("hv2interparent")) {
      l2 = "Other / Definition Not Available";
    } else if (vLower.includes("childpres") || vLower.includes("intervals")) {
      l2 = "Regular Variables";
    } else {
      l2 = "Composites";
    }
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  const ageTasks = [
    "Maternal Leave Taking",
    "Child Demand / Toy Prohibition",
    "Toy Prohibition",
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

  if (selectedTask === "Door Opening") {
    const l1 = "Door Opening Task Variables";
    const isComposite =
      vLower.startsWith("dooropeningcomposite") ||
      vLower.startsWith("dooropeningrewardsensitivity") ||
      vLower.startsWith("dooropeningpunishmentsensitivity");
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Fruit Stroop") {
    const l1 = "Fruit Stroop Task Variables";
    const isComposite =
      vLower.startsWith("fruitstroopsmall") ||
      vLower.startsWith("fruitstrooplarge") ||
      vLower.startsWith("fruitstroopavg");
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Grass Snow") {
    const l1 = "Grass Snow Task Variables";
    const isComposite =
      vLower.startsWith("grasssnowavg") ||
      (vLower.startsWith("grasssnowtotal") &&
        !vLower.startsWith("grasssnowtotaltrials"));
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Gift Delay") {
    const l1 = "Gift Delay Task Variables";
    const isComposite =
      vLower.startsWith("giftdelayscore") ||
      (vLower.startsWith("giftdelaylatency") &&
        !vLower.startsWith("giftdelaylatencyto"));
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Walk a Line") {
    const l1 = "Walk a Line Task Variables";
    const isComposite =
      vLower.startsWith("walkalineslow") ||
      vLower.startsWith("walkalineratiobaselineoverslow");
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Whisper") {
    const l1 = "Whisper Task Variables";
    const isComposite =
      vLower.startsWith("whispergametotal") ||
      vLower.startsWith("whispergameavg");
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Snack Delay") {
    const l1 = "Snack Delay Task Variables";
    const isComposite =
      vLower.startsWith("snackdelayavg") ||
      vLower.startsWith("snackdelaypt1avg") ||
      vLower.startsWith("snackdelaypt2avg");
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Stop-Go") {
    const l1 = "Stop-Go Task Variables";
    const isComposite =
      vLower.startsWith("stopgostopp") ||
      vLower.startsWith("stopgorunp") ||
      vLower.startsWith("stopgoslowp") ||
      vLower.startsWith("stopgodelayp") ||
      vLower.startsWith("stopgoanticipationp") ||
      vLower.startsWith("stopgofalsestopp") ||
      vLower.startsWith("stopgofalsestartp") ||
      vLower.startsWith("stopgostoprunavg");
    const l2 = isComposite ? "Composites" : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Child Compliance / Toy Clean Up") {
    const l1 = "Child Compliance / Toy Clean Up Task Variables";
    const l2 = vLower.startsWith("childcompliancetoycleanupchildpres")
      ? "Regular Variables"
      : "Composites";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Broken Toy Related") {
    const l1 = "Broken Toy Related Task Variables";
    const l2 = vLower.startsWith("brokentoyavedistress")
      ? "Composites"
      : "Regular Variables";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Sustained Attention") {
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return {
      l1Category: "Sustained Attention Task Variables",
      l2Timepoint: "Composites",
      l3Group: l3,
    };
  }

  if (selectedTask === "Token Sort") {
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return {
      l1Category: "Token Sort Task Variables",
      l2Timepoint: "Regular Variables",
      l3Group: l3,
    };
  }

  if (selectedTask === "Parental Control") {
    const l1 = "Parental Control Task Variables";
    const l2 = vLower.includes("childpres") ? "Regular Variables" : "Composites";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Toy Frustration") {
    const l1 = "Toy Frustration Task Variables";
    const l2 =
      vLower.includes("childpres") || vLower.includes("parentpres")
        ? "Regular Variables"
        : "Composites";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Child Positive Affect") {
    const l1 = "Child Positive Affect Task Variables";
    const l2 = vLower.includes("childpres") ? "Regular Variables" : "Composites";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Child Negative Affect") {
    const l1 = "Child Negative Affect Task Variables";
    const l2 = vLower.includes("childpres") ? "Regular Variables" : "Composites";
    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";
    return { l1Category: l1, l2Timepoint: l2, l3Group: l3 };
  }

  if (selectedTask === "Sleep Diary – Child") {
    const l1 = selectedTask;

    let l2 = null;
    if (vLower.includes("sdchildweek1sadeh")) l2 = "Child Week 1 Sadeh";
    else if (vLower.includes("sdchildcombinedsadeh")) l2 = "Child Combined Sadeh";
    else if (vLower.includes("sdchildweek2sadeh")) l2 = "Child Week 2 Sadeh";
    else if (vLower.includes("sdchildweek1colekripke")) l2 = "Child Week 1 ColeKripke";
    else if (vLower.includes("sdchildcombinedcolekripke")) l2 = "Child Combined ColeKripke";
    else if (vLower.includes("sdchildweek2colekripke")) l2 = "Child Week 2 ColeKripke";

    if (!l2) {
      return { l1Category: "Needs Review / Other Related Variables", l2Timepoint: "Other" };
    }

    let l3 = "Other";
    if (vLower.endsWith("30")) l3 = "Age 30";
    else if (vLower.endsWith("36")) l3 = "Age 36";
    else if (vLower.endsWith("42")) l3 = "Age 42";
    else if (vLower.endsWith("54")) l3 = "Age 54";

    let l4 = "Other";
    if (vLower.startsWith("up")) l4 = "Up Variables";
    else if (vLower.startsWith("down")) l4 = "Down Variables";
    else if (vLower.startsWith("truesleep")) l4 = "True Sleep Variables";
    else if (vLower.startsWith("nap")) l4 = "Nap Variables";

    return { l1Category: l1, l2Timepoint: l2, l3Group: l3, l4Group: l4 };
  }

  const defaultL1 = `${selectedTask} Task`;
  return { l1Category: defaultL1, l2Timepoint: "All" };
};

export const groupVariablesBySubcategory = (variables, selectedCategory, selectedTask) => {
  if (!selectedTask) return null;

  const cleanedVars = [...new Set(variables.map((v) => v.trim()))];

  const groups = {};

  cleanedVars.forEach((v) => {
    const { l1Category, l2Timepoint, l3Group, l4Group } = getVariableGroup(v, selectedCategory, selectedTask);

    if (!groups[l1Category]) {
      groups[l1Category] = {};
    }

    if (l3Group && l4Group) {
      if (!groups[l1Category][l2Timepoint]) {
        groups[l1Category][l2Timepoint] = {};
      }
      if (!groups[l1Category][l2Timepoint][l3Group]) {
        groups[l1Category][l2Timepoint][l3Group] = {};
      }
      if (!groups[l1Category][l2Timepoint][l3Group][l4Group]) {
        groups[l1Category][l2Timepoint][l3Group][l4Group] = [];
      }
      groups[l1Category][l2Timepoint][l3Group][l4Group].push(v);
    } else if (l3Group) {
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

  const l2Order = {
    "Regular Variables": 0,
    "Behavioral Composites": 1,
    "Imputed Composites": 2,
    "Composites": 3,
    "Other / Definition Not Available": 4,
  };
  Object.keys(groups).forEach((l1) => {
    const entries = Object.keys(groups[l1]).map((k, i) => [k, i]);
    entries.sort((a, b) => {
      const ra = a[0] in l2Order ? l2Order[a[0]] : 5;
      const rb = b[0] in l2Order ? l2Order[b[0]] : 5;
      return ra !== rb ? ra - rb : a[1] - b[1];
    });
    const reordered = {};
    entries.forEach(([k]) => {
      reordered[k] = groups[l1][k];
    });
    groups[l1] = reordered;
  });

  if (groups["Sleep Diary – Child"]) {
    const sdChildGroupOrder = {
      "Child Week 1 Sadeh": 0,
      "Child Combined Sadeh": 1,
      "Child Week 2 Sadeh": 2,
      "Child Week 1 ColeKripke": 3,
      "Child Combined ColeKripke": 4,
      "Child Week 2 ColeKripke": 5,
    };
    const entries = Object.keys(groups["Sleep Diary – Child"]).map((k, i) => [k, i]);
    entries.sort((a, b) => {
      const ra = a[0] in sdChildGroupOrder ? sdChildGroupOrder[a[0]] : 99;
      const rb = b[0] in sdChildGroupOrder ? sdChildGroupOrder[b[0]] : 99;
      return ra !== rb ? ra - rb : a[1] - b[1];
    });
    const reordered = {};
    entries.forEach(([k]) => {
      reordered[k] = groups["Sleep Diary – Child"][k];
    });
    groups["Sleep Diary – Child"] = reordered;
  }

  if (groups["Child Behavior Checklist Task"]) {
    const cbclGroupOrder = {
      "Primary Caregiver": 0,
      "Parenting Partner": 1,
      "Secondary Caregiver": 2,
    };
    const entries = Object.keys(groups["Child Behavior Checklist Task"]).map((k, i) => [k, i]);
    entries.sort((a, b) => {
      const ra = a[0] in cbclGroupOrder ? cbclGroupOrder[a[0]] : 99;
      const rb = b[0] in cbclGroupOrder ? cbclGroupOrder[b[0]] : 99;
      return ra !== rb ? ra - rb : a[1] - b[1];
    });
    const reordered = {};
    entries.forEach(([k]) => {
      reordered[k] = groups["Child Behavior Checklist Task"][k];
    });
    groups["Child Behavior Checklist Task"] = reordered;
  }

  if (groups["Child Behavior Questionnaire Task"]) {
    const cbqCaregiverOrder = {
      "Primary Caregiver": 0,
      "Parenting Partner": 1,
      "Secondary Caregiver": 2,
    };
    const l1Data = groups["Child Behavior Questionnaire Task"];
    Object.keys(l1Data).forEach((l2) => {
      const entries = Object.keys(l1Data[l2]).map((k, i) => [k, i]);
      entries.sort((a, b) => {
        const ra = a[0] in cbqCaregiverOrder ? cbqCaregiverOrder[a[0]] : 99;
        const rb = b[0] in cbqCaregiverOrder ? cbqCaregiverOrder[b[0]] : 99;
        return ra !== rb ? ra - rb : a[1] - b[1];
      });
      const reordered = {};
      entries.forEach(([k]) => {
        reordered[k] = l1Data[l2][k];
      });
      l1Data[l2] = reordered;
    });
  }

  if (groups["Teacher Questionnaires Task"]) {
    const teacherGroupOrder = {
      Class: 0,
      "Teacher Demographics": 1,
      "Teacher Checklist": 2,
    };
    const l1Data = groups["Teacher Questionnaires Task"];
    Object.keys(l1Data).forEach((l2) => {
      const entries = Object.keys(l1Data[l2]).map((k, i) => [k, i]);
      entries.sort((a, b) => {
        const ra = a[0] in teacherGroupOrder ? teacherGroupOrder[a[0]] : 99;
        const rb = b[0] in teacherGroupOrder ? teacherGroupOrder[b[0]] : 99;
        return ra !== rb ? ra - rb : a[1] - b[1];
      });
      const reordered = {};
      entries.forEach(([k]) => {
        reordered[k] = l1Data[l2][k];
      });
      l1Data[l2] = reordered;
    });
  }

  if (groups["DIFFER Cognitive Ability"]) {
    const differL2Order = {
      "Oddball Related": 0,
      "Fish Sharks Related": 1,
      "ICQ Difficult Related": 2,
      "Preschool Demographics Related": 3,
    };
    const differL3Order = {
      "ICQ Composites": 0,
      "ICQ Longitudinal Means": 1,
    };
    const l1Data = groups["DIFFER Cognitive Ability"];

    const entries = Object.keys(l1Data).map((k, i) => [k, i]);
    entries.sort((a, b) => {
      const ra = a[0] in differL2Order ? differL2Order[a[0]] : 99;
      const rb = b[0] in differL2Order ? differL2Order[b[0]] : 99;
      return ra !== rb ? ra - rb : a[1] - b[1];
    });
    const reordered = {};
    entries.forEach(([k]) => {
      reordered[k] = l1Data[k];
    });
    groups["DIFFER Cognitive Ability"] = reordered;

    const icq = reordered["ICQ Difficult Related"];
    if (icq && !Array.isArray(icq)) {
      const icqEntries = Object.keys(icq).map((k, i) => [k, i]);
      icqEntries.sort((a, b) => {
        const ra = a[0] in differL3Order ? differL3Order[a[0]] : 99;
        const rb = b[0] in differL3Order ? differL3Order[b[0]] : 99;
        return ra !== rb ? ra - rb : a[1] - b[1];
      });
      const icqReordered = {};
      icqEntries.forEach(([k]) => {
        icqReordered[k] = icq[k];
      });
      reordered["ICQ Difficult Related"] = icqReordered;
    }
  }

  const ageGroupOrder = { "Age 30": 0, "Age 36": 1, "Age 42": 2, "Age 54": 3 };
  const sortAgeGroupsByFamily = (l1Data, familyOrder, toFamily) => {
    const familyRank = (v) => {
      const idx = familyOrder.indexOf(toFamily(v.toLowerCase()));
      return idx === -1 ? 99 : idx;
    };
    Object.keys(l1Data).forEach((l2) => {
      const entries = Object.keys(l1Data[l2]).map((k, i) => [k, i]);
      entries.sort((a, b) => {
        const ra = a[0] in ageGroupOrder ? ageGroupOrder[a[0]] : 99;
        const rb = b[0] in ageGroupOrder ? ageGroupOrder[b[0]] : 99;
        return ra !== rb ? ra - rb : a[1] - b[1];
      });
      const reordered = {};
      entries.forEach(([k]) => {
        reordered[k] = l1Data[l2][k]
          .map((v, i) => [v, i])
          .sort((a, b) => {
            const ra = familyRank(a[0]);
            const rb = familyRank(b[0]);
            return ra !== rb ? ra - rb : a[1] - b[1];
          })
          .map(([v]) => v);
      });
      l1Data[l2] = reordered;
    });
  };

  if (groups["Adult Temperament Questionnaire Task"]) {
    sortAgeGroupsByFamily(
      groups["Adult Temperament Questionnaire Task"],
      [
        "fear",
        "frustration",
        "sadness",
        "discomfort",
        "negativeaffect",
        "activationcontrol",
        "attentionalcontrol",
        "inhibitorycontrol",
        "effortfulcontrol",
        "sociability",
        "highintensitypleasure",
        "positiveaffect",
        "extraversion",
        "neutralperceptualsensitivity",
        "affectiveperceptualsensitivity",
        "associativesensitivity",
        "orientingsensitivity",
      ],
      (v) => v.replace(/^atq/, "").replace(/(primary|parentingpartner)\d+$/, "")
    );
  }

  const briefTask = "BRIEF-A (Behavior Rating Inventory of Executive Function – Adult Version) Task";
  if (groups[briefTask]) {
    sortAgeGroupsByFamily(
      groups[briefTask],
      [
        "briefinconsistencyvalidity",
        "briefinfrequencyvalidity",
        "briefnegativityvalidity",
        "briefishighlynegative",
        "briefinhibit",
        "briefshift",
        "briefemotionalcontrol",
        "briefselfmonitor",
        "briefinitiate",
        "briefworkingmemory",
        "briefplanorganize",
        "brieftaskmonitor",
        "brieforganizationofmaterials",
        "briefbehavioralregulationindex",
        "briefmetacognitionindex",
        "briefglobalexecutivecomposite",
      ],
      (v) => v.replace(/\d+$/, "")
    );
  }

  const sleepGroupOrderPriority = (key) => {
    if (key.startsWith("Age ")) {
      const num = parseInt(key.slice(4), 10);
      return isNaN(num) ? 9999 : num;
    }
    if (key === "Sleep Variables") return -2;
    if (key === "Observation Count Variables") return -1;
    if (key === "Up Variables") return -6;
    if (key === "Down Variables") return -5;
    if (key === "True Sleep Variables") return -4;
    if (key === "Nap Variables") return -3;
    return null;
  };

  const sortSleepNestedKeys = (node) => {
    if (Array.isArray(node)) return node;
    const entries = Object.keys(node).map((k, i) => [k, i]);
    entries.sort((a, b) => {
      const pa = sleepGroupOrderPriority(a[0]);
      const pb = sleepGroupOrderPriority(b[0]);
      if (pa !== null && pb !== null) return pa - pb;
      if (pa !== null) return -1;
      if (pb !== null) return 1;
      return a[1] - b[1];
    });
    const reordered = {};
    entries.forEach(([k]) => {
      reordered[k] = sortSleepNestedKeys(node[k]);
    });
    return reordered;
  };

  ["Child", "Parent", "Summary", "Sleep Diary – Child"].forEach((l1) => {
    if (!groups[l1]) return;
    Object.keys(groups[l1]).forEach((l2) => {
      groups[l1][l2] = sortSleepNestedKeys(groups[l1][l2]);
    });
  });

  return groups;
};

const levelIcons = { 1: "📁", 2: "🗂️", 3: "📂" };

const groupIcon = (name, level) => {
  if (typeof name === "string" && name.startsWith("Age ")) return "📅";
  return levelIcons[level] || "📂";
};

const levelAccents = {
  1: { border: "rgba(96, 165, 250, 0.55)", background: "rgba(96, 165, 250, 0.07)" },
  2: { border: "rgba(251, 191, 36, 0.5)", background: "rgba(251, 191, 36, 0.06)" },
  3: { border: "rgba(52, 211, 153, 0.5)", background: "rgba(52, 211, 153, 0.05)" },
  4: { border: "rgba(167, 139, 250, 0.5)", background: "rgba(167, 139, 250, 0.06)" },
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
      {Object.entries(groupedVars).sort((a,b)=>{if(a[0]==='Compliments Task Variables') return -1; if(b[0]==='Compliments Task Variables') return 1; if(a[0]==='Bird Alligator Task Variables') return -1; if(b[0]==='Bird Alligator Task Variables') return 1; if(a[0]==='Needs Review / Other Related Variables') return 1; if(b[0]==='Needs Review / Other Related Variables') return -1; if(a[0]==='Composites') return 1; if(b[0]==='Composites') return -1; return a[0].localeCompare(b[0]);}).map(([l1Category,l2Groups])=>{
        const totalInL1 = countDisplayedVariables(l2Groups);
        if (totalInL1 === 0) return null;

        const isL1Expanded = expandedVarL1[l1Category] !== false;

        const skipL1Header =
          selectedTask === "Child" || selectedTask === "Parent" || selectedTask === "Summary";

        const l2Content = (
          <React.Fragment>
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
                        const totalInL3 = countDisplayedVariables(l3Vars);
                        if (totalInL3 === 0) return null;

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
                                background: levelAccents[3].background,
                                borderLeft: `3px solid ${levelAccents[3].border}`,
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
                                <span>{groupIcon(l3Group, 3)} {l3Group}</span>
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
                                {totalInL3}
                              </span>
                            </div>

                            {isL3Expanded && (
                              <div style={{ paddingLeft: "0.75rem", marginTop: "0.2rem" }}>
                                {Array.isArray(l3Vars)
                                  ? l3Vars.map(renderVariableRow)
                                  : Object.entries(l3Vars).map(([l4Group, l4Vars]) => {
                                      if (l4Vars.length === 0) return null;

                                      const l4Key = `${l3Key}-${l4Group}`;
                                      const isL4Expanded = expandedVarL2[l4Key] !== false;

                                      return (
                                        <div key={l4Group} style={{ marginBottom: "0.5rem" }}>
                                          <div
                                            onClick={() => toggleVarL2(l4Key)}
                                            style={{
                                              padding: "0.5rem 0.5rem",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              cursor: "pointer",
                                              background: levelAccents[4].background,
                                              borderLeft: `3px solid ${levelAccents[4].border}`,
                                              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                              borderRadius: "4px",
                                              fontWeight: "500",
                                              fontSize: "0.85rem",
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
                                                  transform: isL4Expanded ? "rotate(90deg)" : "rotate(0deg)",
                                                }}
                                              >
                                                ▶
                                              </span>
                                              <span>{groupIcon(l4Group, 3)} {l4Group}</span>
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
                                              {l4Vars.length}
                                            </span>
                                          </div>

                                          {isL4Expanded && (
                                            <div style={{ paddingLeft: "0.75rem", marginTop: "0.2rem" }}>
                                              {l4Vars.map(renderVariableRow)}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
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
                          background: levelAccents[2].background,
                          borderLeft: `3px solid ${levelAccents[2].border}`,
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
                            {groupIcon(l2Timepoint, 2)}{" "}
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
          </React.Fragment>
        );

        if (skipL1Header) {
          return <React.Fragment key={l1Category}>{l2Content}</React.Fragment>;
        }

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
                background: levelAccents[1].background,
                borderLeft: `3px solid ${levelAccents[1].border}`,
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
                <span>{groupIcon(l1Category, 1)} {l1Category}</span>
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
                {l2Content}
              </div>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default VariableDescription;
