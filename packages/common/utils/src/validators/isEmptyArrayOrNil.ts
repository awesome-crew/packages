import { Nilable } from '@awesome-dev/typings';

import { hasPositiveLength } from './hasPositiveLength';
import { isNil } from './isNil';

export function isEmptyArrayOrNil(value: unknown): value is Nilable<[]> {
  return isNil(value) || (Array.isArray(value) && !hasPositiveLength(value));
}
