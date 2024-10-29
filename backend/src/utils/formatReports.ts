import type { MRFReport, ServiceCode } from "../types/index.js";

export function formatReports(parsedFile: Array<string[]>) {
  const headerRow = parsedFile[0];
  const headersIndexesMap = headerRow.reduce<Record<string, number>>((prev, title, index) => ({ ...prev, [title]: index }), {});

  return parsedFile.reduce<MRFReport[]>(
    (prev, curr) => [
      ...prev,
      {
        reporting_entity_name: curr[headersIndexesMap["Provider Name"]],
        reporting_entity_type: curr[headersIndexesMap["Provider ID"]],
        plan_name: curr[headersIndexesMap["Plan"]],
        plan_id_type: "string",
        plan_id: curr[headersIndexesMap["Plan ID"]],
        plan_market_type: "individual",
        last_updated_on: new Date(Date.now()).toISOString(),
        version: "1",
        out_of_network: [
          {
            name: curr[headersIndexesMap["Group Name"]],
            billing_code_type: "CPT",
            billing_code_type_version: "1",
            billing_code: "1",
            description: "",
            allowed_amounts: [
              {
                tin: {
                  properties: {
                    type: "ein",
                    value: "",
                  },
                },
                service_code: [curr[headersIndexesMap["Member Sequence"]] as ServiceCode],
                billing_class: curr[headersIndexesMap["Claim Type"]] as "professional" | "institutional",
                payments: [
                  {
                    allowed_amount: curr[headersIndexesMap["Allowed"]] as unknown as number,
                    providers: [{ billed_charge: curr[headersIndexesMap["Billed"]] as unknown as number, npi: [1] }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    [],
  );
}
