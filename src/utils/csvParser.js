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
