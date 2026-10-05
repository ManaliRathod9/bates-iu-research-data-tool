import Papa from "papaparse";

const invalidValues = new Set(["NA", "N/A", "NaN", "null", "."]);

const cleanCell = (value) => {
  if (value === null || value === undefined) return "";
  const trimmed = String(value).trim();
  if (trimmed.length === 0) return "";
  if (invalidValues.has(trimmed)) return "";
  return value;
};

self.onmessage = async (e) => {
  try {
    const text = await e.data.text();
    const fields = Papa.parse(text, { header: true, skipEmptyLines: true, preview: 1 }).meta.fields || [];
    const parsed = Papa.parse(text, { skipEmptyLines: true });
    const rows = parsed.data;
    rows.shift();
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      for (let i = 0; i < row.length; i++) {
        row[i] = cleanCell(row[i]);
      }
    }
    self.postMessage({ fields, rows });
  } catch (error) {
    self.postMessage({ error: String(error) });
  }
};
