import { FileWithPath } from "@mantine/dropzone";
import PapaParse from "papaparse";
import React from "react";
import { validateFile } from "../utils/validateFile";

export function useValidateAndParseCsvFile() {
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [parsedFile, setParsedFile] = React.useState<Array<string[]> | null>(null);
  const [isValidating, setValidating] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);

  const resetState = () => {
    setUploadedFile(null);
    setParsedFile(null);
    setValidating(false);
    setValidationError(null);
  };

  const onDrop = async (files: FileWithPath[]) => {
    resetState();
    setValidating(true);

    const newFile = files[0];

    if (!newFile) {
      setValidationError("No file uploaded");
      return;
    }

    PapaParse.parse<string[]>(newFile, {
      worker: true,
      complete(results) {
        const fileValidationResult = validateFile(results.data);
        setValidating(false);

        if (fileValidationResult) {
          setValidationError(fileValidationResult);
          return;
        }

        setParsedFile(results.data);
        setUploadedFile(newFile);
      },
      error(e: Error) {
        console.error(e);
        resetState();
        setValidationError(e.message || "File is invalid");
      },
    });
  };

  const onReject = () => {
    setValidationError("File is invalid");
  };

  return {
    parsedFile,
    isValidating,
    validationError,
    onReject,
    onDrop,
    uploadedFile,
    resetState,
  };
}
