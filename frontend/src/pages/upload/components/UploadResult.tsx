import { Button, Title } from "@mantine/core";

interface Props {
  success: boolean;
  goBack: () => void;
}

export default function UploadResult({ success, goBack }: Props) {
  return (
    <div className="flex items-center flex-col justify-center gap-2 flex-">
      <Title className={success ? "!text-teal-700" : "!text-red-600"} order={3}>
        {success ? "Successfully uploaded file" : "Failed to upload file"}
      </Title>
      <Button color="teal" onClick={goBack}>
        Try another file
      </Button>
    </div>
  );
}
