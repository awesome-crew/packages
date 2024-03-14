import { describe, it, expect } from '@jest/globals';

import { sortByUnicode } from './sort';

describe('sortByUnicode()', () => {
  it('문자가 담긴 배열을 유니코드 기준으로 정렬한다.', () => {
    // Given
    const input = ['나', '다', '가', '라'];

    // When
    const result = input.sort(sortByUnicode);

    // Then
    expect(result).toEqual(['가', '나', '다', '라']);
  });

  it('비교 결과가 동일하다면 다음 문자로 넘겨 순차적으로 정렬한다', () => {
    // Given
    const input = ['가나', '가다', '가가', '가라'];

    // When
    const result = input.sort(sortByUnicode);

    // Then
    expect(result).toEqual(['가가', '가나', '가다', '가라']);
  });

  it('비교 결과가 모두 동일하다면 문자 길이가 짧은 순으로 정렬한다.', () => {
    // Given
    const input = ['가가', '가', '가가가', '가'];

    // When
    const result = input.sort(sortByUnicode);

    // Then
    expect(result).toEqual(['가', '가', '가가', '가가가']);
  });
});
