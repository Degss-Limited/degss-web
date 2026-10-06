export function formatThousands(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;

  const prefixMatch = trimmed.match(/^[^\d]*/);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  const rest = trimmed.slice(prefix.length);

  const hasDecimalPoint = rest.includes(".");
  const [intRaw, ...decimalRest] = rest.split(".");
  const digits = intRaw.replace(/[^\d]/g, "");
  if (!digits) return trimmed;

  const formattedInt = Number(digits).toLocaleString("en-US");
  const decimalDigits = decimalRest.join("").replace(/[^\d]/g, "");
  const decimal = hasDecimalPoint ? `.${decimalDigits}` : "";

  return `${prefix}${formattedInt}${decimal}`;
}

export function formatPrice(value: string): string {
  return formatThousands(value);
}
