import Papa from "papaparse";

const cleanCell = (value) => {
  if (value === null || value === undefined) return "";

  const strValue = String(value);
  const trimmed = strValue.trim();

  if (trimmed.length === 0) return "";

  const invalidValues = new Set(["NA", "N/A", "NaN", "null", "."]);

  if (invalidValues.has(trimmed)) {
    return "";
  }

  return value;
};

export const parseCSV = (file, onComplete, onError) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    transform: (value) => {
      return cleanCell(value);
    },
    complete: (results) => {
      console.log("Parsed Rule: Replaced invalid values with empty strings.");
      onComplete(results.data);
    },
    error: (error) => {
      if (onError) onError(error);
    },
  });
};
