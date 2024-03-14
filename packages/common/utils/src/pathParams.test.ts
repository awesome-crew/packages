import { describe, test, it, expect } from '@jest/globals';

import { pathParams } from './pathParams';

describe('pathParams.serialize', () => {
  test('path parameter가 존재하는 API 패스에 값을 넣어준다.', () => {
    // Given
    const path = '/users/:userId' as const;
    const variables = { userId: 1 };

    // When
    const result = pathParams.serialize(path, variables);

    // Then
    expect(result).toBe('/users/1');
  });

  test('path parameter가 존재하는 Next.js 동적 패스에 값을 넣어준다.', () => {
    // Given
    const path = '/user/[userId]' as const;
    const variables = { userId: 1 };

    // When
    const result = pathParams.serialize(path, variables);

    // Then
    expect(result).toBe('/user/1');
  });

  it.each`
    path                                        | then
    ${'/users/:userId/address/:addressId'}      | ${'/users/1/address/1'}
    ${'/users/:userId/:addressId/address'}      | ${'/users/1/1/address'}
    ${'/:userId/:addressId/address'}            | ${'/1/1/address'}
    ${'/users/:userId/:addressId'}              | ${'/users/1/1'}
    ${'/users/:userId/:addressId/test/:testId'} | ${'/users/1/1/test/2'}
  `('path parameter가 여러개 있을 경우 키에 매칭되는 variables에 적용된다.', ({ path, then }) => {
    //given
    const variables = { userId: 1, addressId: 1, testId: 2 };

    //when
    const result = pathParams.serialize(path, variables);

    // Then
    expect(result).toBe(then);
  });
});
