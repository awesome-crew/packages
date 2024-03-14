import { describe, expect, test } from '@jest/globals';

import { padNumber } from './padNumber';

describe('padNumber', () => {
  test('한 자리일 경우, 앞에 0을 추가한다.', () => {
    expect(padNumber(1)).toBe('01');
    expect(padNumber('1')).toBe('01');
    expect(padNumber(12)).toBe('12');
    expect(padNumber('12')).toBe('12');
  });
});
