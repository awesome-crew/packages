import type { Nilable } from '@awesome-dev/typings';

export function isEmptyStringOrNil(value: unknown): value is Nilable<''> {
  return value == null || value === '';
}
