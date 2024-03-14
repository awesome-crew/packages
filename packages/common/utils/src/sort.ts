export function sortByUnicode(a: string, b: string) {
  for (let i = 0, leng = Math.max(a.length, b.length); i < leng; i++) {
    if (a[i] == null) {
      return -1;
    }
    if (b[i] == null) {
      return 1;
    }

    const diff = a[i].charCodeAt(0) - b[i].charCodeAt(0);

    if (Math.abs(diff) > 0) {
      return diff;
    }
  }

  return 0;
}
