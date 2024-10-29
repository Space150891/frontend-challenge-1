import { validateFile } from "./validateFile.js";
import PapaParse from "papaparse";

export async function parseAndValidateCsvFile(file: File) {
  let parsedFile: Array<string[]> = [];
  let validationError: string = "";

  try {
    PapaParse.parse<string[]>(await file.text(), {
      worker: true,
      complete(results) {
        parsedFile = results.data;
      },
      error(e: Error) {
        console.error(e);
        validationError = e.message || "File validation failed.";
      },
    });
  } catch {
    validationError = "Failed to validate file";
  }

  if (parsedFile) {
    const fileValidationResult = validateFile(parsedFile);
    if (fileValidationResult) {
      validationError = fileValidationResult;
    }
  }

  return { parsedFile, validationError };
}
