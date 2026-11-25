// Presentation only: never use these labels as data or selection keys.
const variableLabels = {
  classTeacherSensitivity30: "Class Teacher Sensitivity 30",
  classTeacherSensitivity36: "Class Teacher Sensitivity 36",
  classTeacherSensitivity42: "Class Teacher Sensitivity 42",
  classTeacherSensitivity54: "Class Teacher Sensitivity 54",
};

export const getVariableLabel = (identifier) =>
  Object.hasOwn(variableLabels, identifier) ? variableLabels[identifier] : identifier;
