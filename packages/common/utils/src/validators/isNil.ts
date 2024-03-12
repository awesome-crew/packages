import type { Nil } from '@awesome-dev/typings';

export function isNil(value: unknown): value is Nil {
  return value == null;
}
