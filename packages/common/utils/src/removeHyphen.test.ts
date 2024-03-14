import { describe, test, expect } from '@jest/globals';

import { removeHyphen } from './removeHyphen';

describe('removeHypen', () => {
  test('하이픈을 제거한다', () => {
    // Given
    const text = '123-123-123';
    // When
    const result = removeHyphen(text);
    // Then
    expect(result).toBe('123123123');
  });
});
