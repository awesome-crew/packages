import type { Primitive } from './common';

type AvailableDepth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type SubtractOne<Value extends AvailableDepth> = Value extends 1
  ? 0
  : Value extends 2
    ? 1
    : Value extends 3
      ? 2
      : Value extends 4
        ? 3
        : Value extends 5
          ? 4
          : Value extends 6
            ? 5
            : Value extends 7
              ? 6
              : Value extends 8
                ? 7
                : Value extends 9
                  ? 8
                  : 9;

/**
 * This type is used to generate a string path for a given object type.
 * It will generate a string path for all properties of the object type.
 * it only goes to a maximum depth of given levels. default,max is 10.
 */
export type PropertyStringPath<T, Prefix = '', MaxDepth extends AvailableDepth = 10> = T extends
  | Primitive
  | Array<Primitive>
  ? never
  : T extends Array<any>
    ? PropertyStringPath<T[0], Prefix, SubtractOne<MaxDepth>>
    : {
        [K in keyof T]: T[K] extends Primitive | Array<Primitive>
          ? `${string & Prefix}${string & K}`
          :
              | `${string & Prefix}${string & K}`
              | (MaxDepth extends 0
                  ? never
                  : PropertyStringPath<
                      T[K],
                      `${string & Prefix}${string & K}.`,
                      SubtractOne<MaxDepth>
                    >);
      }[keyof T];
