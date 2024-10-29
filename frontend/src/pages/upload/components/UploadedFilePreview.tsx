import { AgGridReact } from "ag-grid-react";
import React from "react";

export const HEADER_ROW_INDEX = 1;

interface Props {
  parsedFile: Array<string[]>;
}

export default function UploadedFilePreview({ parsedFile }: Props) {
  const { rowData, colDefs } = React.useMemo(() => {
    const headerRow = parsedFile[HEADER_ROW_INDEX];
    const headersIndexesMap = headerRow.reduce<Record<number, string>>((prev, title, index) => ({ ...prev, [index]: title }), {});

    const dataWihtoutHeaderRow = parsedFile.slice(HEADER_ROW_INDEX + 1);
    const rowData = dataWihtoutHeaderRow.reduce<Array<Record<string, string>>>(
      (prev, row) => [...prev, row.reduce<Record<string, string>>((prev, item, index) => ({ ...prev, [headersIndexesMap[index]]: item }), {})],
      [],
    );
    const colDefs = headerRow.map<{ field: string }>((title) => ({ field: title }));

    console.log({ colDefs, rowData });
    return { colDefs, rowData };
  }, [parsedFile]);

  return <AgGridReact className="flex-1 !h-[65vh]" rowData={rowData} columnDefs={colDefs} />;
}
