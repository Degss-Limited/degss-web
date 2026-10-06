/** Reformats an input's value in place while keeping the caret after the same digit. */
export function formatAndPreserveCaret(
  input: HTMLInputElement,
  formatter: (value: string) => string
) {
  const prevValue = input.value;
  const caret = input.selectionStart ?? prevValue.length;
  const digitsBeforeCaret = prevValue.slice(0, caret).replace(/[^\d]/g, "").length;

  const formatted = formatter(prevValue);
  if (formatted === prevValue) return;

  input.value = formatted;

  let seen = 0;
  let newCaret = formatted.length;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      seen++;
      if (seen === digitsBeforeCaret) {
        newCaret = i + 1;
        break;
      }
    }
  }
  if (digitsBeforeCaret === 0) newCaret = 0;
  input.setSelectionRange(newCaret, newCaret);
}
