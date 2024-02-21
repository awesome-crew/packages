import { describe, expect, it } from '@jest/globals';
import { formatPhoneNumber } from './formatPhoneNumber';

describe('formatPhoneNumber', () => {
  it('대쉬를 제거한다', () => {
    // given
    const given = '010-1234-5678';

    // when
    const result = formatPhoneNumber(given);

    // then
    expect(result).toBe('01012345678');
  });
});
