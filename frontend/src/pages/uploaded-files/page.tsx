import { Card, Group, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { UploadedFilesData } from "~/stores";

const UploadedFiles = observer<UploadedFilesData>(({ fetchData, data }) => {
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      {data?.map(({ content: { last_updated_on }, name }) => (
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={500}>{name}</Text>
              <Text fw={500}>{new Date(last_updated_on).toISOString()}</Text>
            </Group>
          </Card.Section>
        </Card>
      ))}
    </>
  );
});

export default UploadedFiles;
