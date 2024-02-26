/** Convert input string to kebab case. default lower case. upper case if option.capitalize given
 * @param input input string
 * @param option option
 * @param option.capitalize upper case
 * @returns kebab case string
 * @example
 * ```ts
 * toKebabCase('ChoiSumin') // choi-sumin
 * toKebabCase('ChoiSumin', { capitalize: true }) // CHOI-SUMIN
 * toKebabCase('choi_sumin') // choi-sumin
 * toKebabCase('choi_sumin', { capitalize: true }) // CHOI-SUMIN
 * toKebabCase('Choi Sumin') // choi-sumin
 * toKebabCase('Choi Sumin', { capitalize: true }) // CHOI-SUMIN
 * toKebabCase('ChoiSumin is good_Developer') // choi-sumin-is-good-developer
 * ```
 */
export function toKebabCase(input: string, option?: { capitalize?: boolean }) {
  const result = input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/ /g, '-')
    .toLowerCase();

  return option?.capitalize ? result.toUpperCase() : result;
}
