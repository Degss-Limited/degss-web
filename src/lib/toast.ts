/**
 * Appends a toast message to a URL (used before redirect()) so the admin
 * dashboard's <Toaster /> can pick it up and show it with notyf, then strip
 * it from the address bar. Preserves any existing query string on `url`.
 */
export function withToast(
  url: string,
  type: "success" | "error",
  message: string
): string {
  const [path, query = ""] = url.split("?");
  const params = new URLSearchParams(query);
  params.set(type === "success" ? "toastSuccess" : "toastError", message);
  return `${path}?${params.toString()}`;
}
