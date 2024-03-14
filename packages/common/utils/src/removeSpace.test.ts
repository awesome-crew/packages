import { describe, test, expect } from '@jest/globals';

import { removeSpace } from './removeSpace';

describe('removeSpace', () => {
  test('공백이 존재하는 문자를 넘기면, 공백이 제거된 문자를 반환한다.', () => {
    //Given
    const given = 'foo bar ';

    //When
    const actual = removeSpace(given);

    //Then
    const expected = 'foobar';
    expect(actual).toBe(expected);
  });

  test('공백이 존재하지 않은 문자를 넘기면, 그대로 문자를 반환한다.', () => {
    //Given
    const given = 'foobarbaz';

    //When
    const actual = removeSpace(given);

    //Then
    const expected = given;
    expect(actual).toBe(expected);
  });
});
