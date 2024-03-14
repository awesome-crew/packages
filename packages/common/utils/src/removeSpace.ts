export function removeSpace(value: string | null | undefined) {
  if (value == null) {
    return value;
  }

  return value.replace(/\s/g, '');
}
