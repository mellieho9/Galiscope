import { createWorker } from "tesseract.js";

export const getTesseractOutput = async (binaryBuffer: Buffer) => {
  // Create a Tesseract worker
  const worker = await createWorker("eng", 1, {
    workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
  });
  const {
    data: { text },
  } = await worker.recognize(binaryBuffer);

  // Terminate the worker
  await worker.terminate();
  return text;
};
