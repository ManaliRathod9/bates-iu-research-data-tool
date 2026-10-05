import Papa from "papaparse";

const HEADER_CHUNK_SIZE = 256 * 1024;

export const readCSVHeader = async (file) => {
  let end = Math.min(HEADER_CHUNK_SIZE, file.size);
  let text = await file.slice(0, end).text();
  while (!/\r|\n/.test(text) && end < file.size) {
    end = Math.min(end * 2, file.size);
    text = await file.slice(0, end).text();
  }
  const fields = Papa.parse(text, { header: true, skipEmptyLines: true, preview: 1 }).meta.fields || [];
  return fields;
};

export const parseCSV = (file, onComplete, onError) => {
  const worker = new Worker(new URL("./csvParser.worker.js", import.meta.url), { type: "module" });
  worker.onmessage = (e) => {
    worker.terminate();
    if (e.data.error) {
      if (onError) onError(e.data.error);
      return;
    }
    onComplete(e.data);
  };
  worker.onerror = (error) => {
    worker.terminate();
    if (onError) onError(error);
  };
  worker.postMessage(file);
};

export const createCSVSource = (file, fields) => {
  let rowsPromise = null;
  return {
    fields,
    fieldSet: new Set(fields),
    loadRows: () => {
      if (!rowsPromise) {
        rowsPromise = new Promise((resolve, reject) => {
          parseCSV(file, (data) => resolve(data.rows), (error) => {
            rowsPromise = null;
            reject(error);
          });
        });
      }
      return rowsPromise;
    },
  };
};
