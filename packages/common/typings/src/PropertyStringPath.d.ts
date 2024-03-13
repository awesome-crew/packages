export type PropertyStringPath<T, Prefix = ''> = {
  [K in keyof T]: T[K] extends Primitive | Array<any>
    ? `${string & Prefix}${string & K}`
    :
        | `${string & Prefix}${string & K}`
        | PropertyStringPath<T[K], `${string & Prefix}${string & K}.`>;
}[keyof T];
