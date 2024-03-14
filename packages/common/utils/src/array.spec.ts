import { describe, test, expect } from '@jest/globals';

import { shiftUntil, arrayOf, arrayToReadableText, popUntil } from './array';

describe('shiftUntil', () => {
  test('전달한 함수가 참일 때까지 shift를 호출한다', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = shiftUntil(original, x => x < 4);

    expect(result).toEqual([1, 2, 3]);
  });
});

describe('popUntil', () => {
  test('전달한 함수가 참일 때까지 pop을 호출한다', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = popUntil(original, x => x > 4);

    expect(result).toEqual([8, 7, 6, 5]);
    expect(original).toEqual([1, 2, 3, 4]);
  });
});

describe('arrayToReadableText', () => {
  test(`빈 배열에 대해선 'empty' option 값을 반환한다.`, () => {
    expect(arrayToReadableText([])).toBe('');
    expect(arrayToReadableText([], { empty: '비어있음' })).toBe('비어있음');
  });

  test(`길이가 1인 배열에 대해선 'one' option의 반환값을 반환한다.`, () => {
    expect(arrayToReadableText(['one'])).toBe('one');
    expect(arrayToReadableText(['one'], { one: x => `첫번째 값: ${x}` })).toBe('첫번째 값: one');
  });

  test(`길이가 1 이상인 배열에 대해선 'others' option의 반환값을 반환한다.`, () => {
    expect(arrayToReadableText(['one', 'second'])).toBe('one 외 1개');
    expect(
      arrayToReadableText(['one', 'second'], {
        one: x => `첫 ${x}`,
        others: (_, { oneValue, restItemCount }) => `${oneValue} 말고 ${restItemCount}개`,
      })
    ).toBe('one 말고 1개');

    expect(
      arrayToReadableText(['one', 'second'], {
        one: x => `첫 ${x}`,
        others: (_, { oneText, restItemCount }) => `${oneText} 말고 ${restItemCount}개`,
      })
    ).toBe('첫 one 말고 1개');

    expect(
      arrayToReadableText(['one', 'second'], {
        others: (_, { oneText, restItemCount }) => `${oneText} 말고 ${restItemCount}개`,
      })
    ).toBe('one 말고 1개');

    expect(
      arrayToReadableText(['one', 'second'], {
        others: (x, { oneText }) => `${oneText} 말고 ${x.length - 1}개`,
      })
    ).toBe('one 말고 1개');
  });

  test('string으로 전달될 경우, string 그대로 반환한다,', () => {
    expect(arrayToReadableText('string')).toBe('string');
  });
});

describe('arrayOf', () => {
  test('전달한 수만큼의 길이를 가진 배열을 생성한다.', () => {
    expect(arrayOf(3)).toHaveLength(3);
  });
  test('생성된 배열은 index를 요소의 값으로 가진다.', () => {
    expect(arrayOf(3)).toEqual([0, 1, 2]);
  });
  test('요소의 값을 valueAs로 지정할 수 있다.', () => {
    expect(arrayOf(3, x => x * 2)).toEqual([0, 2, 4]);
  });
});
