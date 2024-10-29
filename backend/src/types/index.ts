type OutOfNetwork = {
  name: string;
  billing_code_type: "CPT" | "HCPCS" | "ICD" | "MS-DRG" | "R-DRG" | "S-DRG" | "APS-DRG" | "AP-DRG" | "APR-DRG" | "APC" | "NDC" | "HIPPS" | "LOCAL" | "EAPG" | "CDT" | "RC";
  billing_code_type_version: string;
  billing_code: string;
  description: string;
  allowed_amounts: AllowedAmounts[];
};

type AllowedAmounts = {
  tin: {
    properties: {
      type: "ein" | "npi";
      value: string;
    };
  };
  service_code: ServiceCode[];
  billing_class: "professional" | "institutional";
  payments: Payments[];
};

type Payments = {
  allowed_amount: number;
  billing_code_modifier?: string[];
  providers: Providers[];
};

type Providers = {
  billed_charge: number;
  npi: number[];
};

export type MRFReport = {
  reporting_entity_name: string;
  reporting_entity_type: string;
  plan_name: string;
  plan_id_type: string;
  plan_id: string;
  plan_market_type: "group" | "individual";
  last_updated_on: string;
  version: string;
  out_of_network: OutOfNetwork[];
};

export type ServiceCode =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48"
  | "49"
  | "50"
  | "51"
  | "52"
  | "53"
  | "54"
  | "55"
  | "56"
  | "57"
  | "58"
  | "59"
  | "60"
  | "61"
  | "62"
  | "63"
  | "64"
  | "65"
  | "66"
  | "67"
  | "68"
  | "69"
  | "70"
  | "71"
  | "72"
  | "73"
  | "74"
  | "75"
  | "76"
  | "77"
  | "78"
  | "79"
  | "80"
  | "81"
  | "82"
  | "83"
  | "84"
  | "85"
  | "86"
  | "87"
  | "88"
  | "89"
  | "90"
  | "91"
  | "92"
  | "93"
  | "94"
  | "95"
  | "96"
  | "97"
  | "98"
  | "99";
