const UNITS = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte", "petabyte"];
const BYTES_PER_KB = 1000;

export function humanFileSize(sizeBytes: number | bigint): string {
  let size = Math.abs(Number(sizeBytes));

  let u = 0;
  while (size >= BYTES_PER_KB && u < UNITS.length - 1) {
    size /= BYTES_PER_KB;
    u += 1;
  }

  return new Intl.NumberFormat([], {
    style: "unit",
    unit: UNITS[u],
    unitDisplay: "short",
    maximumFractionDigits: 1,
  }).format(size);
}
