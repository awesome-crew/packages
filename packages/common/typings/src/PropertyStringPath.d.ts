import type { Primitive } from './common';

/**
 * This type is used to generate a string path for a given object type.
 * It will generate a string path for all properties of the object type.
 * it only goes to a maximum depth of given levels. default,max is 10.
 */
export type PropertyStringPath<
  T,
  Prefix = '',
  MaxDepth extends 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 10,
> = {
  [K in keyof T]: T[K] extends Primitive
    ? `${string & Prefix}${string & K}`
    :
        | `${string & Prefix}${string & K}`
        | (MaxDepth extends 0
            ? never
            : PropertyStringPath<
                T[K],
                `${string & Prefix}${string & K}.`,
                MaxDepth extends 1
                  ? 0
                  : MaxDepth extends 2
                    ? 1
                    : MaxDepth extends 3
                      ? 2
                      : MaxDepth extends 4
                        ? 3
                        : MaxDepth extends 5
                          ? 4
                          : MaxDepth extends 6
                            ? 5
                            : MaxDepth extends 7
                              ? 6
                              : MaxDepth extends 8
                                ? 7
                                : MaxDepth extends 9
                                  ? 8
                                  : 9
              >);
}[keyof T];
