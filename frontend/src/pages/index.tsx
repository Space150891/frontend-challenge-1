import { Button, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { PAGES } from "~/routes";

export default function MainPage() {
  return (
    <div className="flex flex-1 items-center justify-center text-sm text-center">
      <div className="space-y-2">
        <Title>Welcome!</Title>
        <Text className="text-gray-400">You can navigate to file upload page or view the list of uploaded MRF files using the buttons bellow.</Text>
        <div className="flex w-full justify-center items-center gap-1">
          <Link to={PAGES.upload}>
            <Button color="violet">Upload file</Button>
          </Link>
          <Link to={PAGES.uploadedFiles}>
            <Button color="teal">View uploaded files</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
