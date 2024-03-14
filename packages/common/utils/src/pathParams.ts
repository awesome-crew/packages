type VariableValue = string | number;

type GeneratePathVariables<
  Path extends string,
  VariablePrefix extends string,
  VariablePostfix extends string = '',
> = Path extends `${infer Head}/${VariablePrefix}${infer VariableKey}${VariablePostfix}/${infer Tail}`
  ? Record<VariableKey, VariableValue> &
      GeneratePathVariables<Head, VariablePrefix, VariablePostfix> &
      GeneratePathVariables<Tail, VariablePrefix, VariablePostfix>
  : GenerateRestPathVariables<Path, VariablePrefix, VariablePostfix>;

type GenerateRestPathVariables<
  Path extends string,
  VariablePrefix extends string,
  VariablePostfix extends string = '',
> = Path extends `${VariablePrefix}${infer LastVariableKey}${VariablePostfix}/${infer FootTail}`
  ? Record<LastVariableKey, VariableValue> &
      GeneratePathVariables<FootTail, VariablePrefix, VariablePostfix>
  : Path extends `${string}/${VariablePrefix}${infer LastVariableKey}${VariablePostfix}`
    ? Record<LastVariableKey, VariableValue>
    : Record<never, never>;

type ExcludeProtocol<URL extends string> = URL extends `https://${infer Pathname}`
  ? Pathname
  : URL extends `http://${infer Pathname}`
    ? Pathname
    : URL extends `//${infer Pathname}`
      ? Pathname
      : URL;

export type PathVariables<Path extends string> = GeneratePathVariables<ExcludeProtocol<Path>, ':'> &
  GeneratePathVariables<ExcludeProtocol<Path>, '[', ']'>;

function serialize<Path extends string>(path: Path, variables: PathVariables<Path>) {
  return Object.entries(variables).reduce((acc, [key, variable]) => {
    const regexp = new RegExp(`:${key}|\\[${key}\\]`, 'g');

    return acc.replace(regexp, (variable as VariableValue).toString());
  }, path as string);
}

export const pathParams = {
  /**
   * @example
   * pathParams.serialize('/search/:keyword', { keyword: 'name' });
   * pathParams.serialize('/search/[keyword]', { keyword: 'name' });
   *  => '/search/name'
   */
  serialize,
};
