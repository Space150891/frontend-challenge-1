import z, { ZodError } from "zod";
const HEADER_ROW_INDEX = 1;

const REQUIRED_FIELDS = [
  "Claim ID",
  "Subscriber ID",
  "Member Sequence",
  "Claim Status",
  "Billed",
  "Allowed",
  "Paid",
  "Payment Status Date",
  "Service Date",
  "Received Date",
  "Entry Date",
  "Processed Date",
  "Paid Date",
  "Payment Status",
  "Group Name",
  "Group ID",
  "Division Name",
  "Division ID",
  "Plan",
  "Plan ID",
  "Place of Service",
  "Claim Type",
  "Procedure Code",
  "Member Gender",
  "Provider ID",
  "Provider Name",
] as const;

export function validateFile(parsedFile: Array<string[]>): string | undefined {
  try {
    const headerRow = parsedFile[HEADER_ROW_INDEX] as unknown as Readonly<[string, ...string[]]>;
    const dataWihtoutHeader = parsedFile.slice(HEADER_ROW_INDEX);

    const headerValuesValidationSchema = z.array(z.enum(REQUIRED_FIELDS));
    headerValuesValidationSchema.parse(headerRow);

    const requiredHeaderFieldsValidationSchema = z.array(z.custom((value) => headerRow.includes(value), "Missing required fields in the header row."));
    requiredHeaderFieldsValidationSchema.parse(REQUIRED_FIELDS);

    const nonEmptyValuesValidationSchema = z.array(z.array(z.string()));
    nonEmptyValuesValidationSchema.parse(dataWihtoutHeader);
  } catch (e: any) {
    console.log(e.message);
    const formattedMessage: string = (e as any).format()[0]
      ? // @ts-ignore
        (Object.values((e as any).format()[0]).reduce<string>((prev, [message]) => (message ? prev + message + "\n" : prev), "") as string)
      : "Invalid file";
    return formattedMessage || "Invalid file";
  }
}
