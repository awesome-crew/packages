export function formatPhoneNumber(input: string) {
  return input.replaceAll(/\-/g, '');
}
