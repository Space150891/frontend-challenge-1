import { Text, Container, Group, rem, Title, Button } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX, IconFile } from "@tabler/icons-react";
import { humanFileSize } from "./utils/humanFileSize";
import { useValidateAndParseCsvFile } from "./hooks/useParseCsvFile";
import UploadedFilePreview from "./components/UploadedFilePreview";
import React from "react";
import UploadResult from "./components/UploadResult";
import { uploadsService } from "~/services/uploadsService";

const FILE_SIZE_LIMIT = 5 * 1024 ** 2;

export default function UploadPage() {
  const [uploadResult, setUploadResult] = React.useState<"SUCCESS" | "ERROR" | null>(null);
  const { parsedFile, resetState, isValidating, validationError, onReject, onDrop, uploadedFile } = useValidateAndParseCsvFile();

  const onUploadClick = async () => {
    if (!uploadedFile || validationError) {
      return;
    }

    const payload = new FormData();
    payload.append("file", uploadedFile);

    try {
      const response = await uploadsService.uploadFile(payload);

      if (response && response.status === 201) {
        setUploadResult("SUCCESS");
      } else {
        setUploadResult("ERROR");
      }
    } catch {
      setUploadResult("ERROR");
    }
  };

  if (uploadResult) {
    const goBack = () => {
      setUploadResult(null);
      resetState();
    };
    return (
      <div className="gap-8 flex-1 pb-8 h-full justify-center flex-col flex">
        <UploadResult success={uploadResult === "SUCCESS"} goBack={goBack} />
      </div>
    );
  }

  return (
    <div className="gap-8 flex-1 pb-8 h-full justify-center flex-col flex">
      <Title className="text-center">Upload your file here</Title>

      {!uploadedFile && (
        <Container size="lg">
          <Dropzone
            loading={isValidating}
            onReject={onReject}
            className="border border-dashed px-6 border-gray-900 cursor-pointer rounded-xl"
            maxSize={FILE_SIZE_LIMIT}
            accept={{ "application/csv": [".csv"] }}
            onDrop={onDrop}
            multiple={false}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
              <Dropzone.Accept>
                <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />{" "}
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconFile style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag <b>.csv</b> file here or click to select a file
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  File should not exceed <b>{humanFileSize(FILE_SIZE_LIMIT)}</b>
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Container>
      )}
      {parsedFile && (
        <Container size="xl" className="flex-1 flex w-full">
          <UploadedFilePreview parsedFile={parsedFile} />
        </Container>
      )}

      {uploadedFile || validationError || uploadedFile ? (
        <div className="flex justify-center gap-2 flex-col">
          {uploadedFile && (
            <Text className="text-center">
              {uploadedFile.name} <span className="opacity-60">({humanFileSize(uploadedFile.size)})</span>
            </Text>
          )}
          {validationError && <Text className="text-center !text-red-600">{validationError}</Text>}
          {uploadedFile && (
            <div className="flex justify-center gap-2">
              <Button onClick={resetState} color="red">
                Cancel
              </Button>
              <Button onClick={onUploadClick} color="teal">
                Upload
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
