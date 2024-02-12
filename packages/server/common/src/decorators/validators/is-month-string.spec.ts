import { describe, expect, it } from '@jest/globals';

import { isMonthString } from './is-month-string';

describe('isMonthString', () => {
  it('should return true when valid', () => {
    const validInputs = ['2023-01', '1995-06'];

    validInputs.forEach(input => {
      expect(isMonthString(input)).toEqual(true);
    });
  });

  it('should return false when invalid', () => {
    const invalidInputs = [
      3332255555,
      '3332255555',
      '202301',
      '2023.01',
      '2023-1',
      '2023-01-01',
      '2023-1-1',
      null,
      undefined,
      true,
    ];

    invalidInputs.forEach(input => {
      expect(isMonthString(input)).toEqual(false);
    });
  });
});
