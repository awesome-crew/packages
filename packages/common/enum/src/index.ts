import { ValueOf } from '@awesome-dev/typings';

/**
 *
 * @example createEnum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) returns an object with the following shape:
 * {
 *  Monday: 'Monday',
 * Tuesday: 'Tuesday',
 * Wednesday: 'Wednesday',
 * Thursday: 'Thursday',
 * Friday: 'Friday',
 * Saturday: 'Saturday',
 * Sunday: 'Sunday',
 * } as const
 */
export function createEnum<T extends string>(values: T[]) {
  return values.reduce(
    (acc, value) => {
      acc[value] = value;
      return acc;
    },
    {} as Record<T, T>
  ) as { readonly [K in T]: K };
}

export type InferEnum<T> = ValueOf<T>;
