import { describe, test, expect } from '@jest/globals';

import { parseUrl } from './url';

const originPath = 'https://jbee.io/react';
const pathname = '/react';

const 쿼리가_없는_URL = 'https://jbee.io/react';
const 쿼리를_하나_포함한_URL = 'https://jbee.io/react?easy=false';
const 쿼리를_두개_포함한_URL = 'https://jbee.io/react?easy=false&difficult=true';
const 쿼리가_동일한_두개인_URL = 'https://jbee.io/react?dateRange=2020-01-01&dateRange=2021-01-01';
const 쿼리가_동일한_두개_다른_하나_총_세_개_URL =
  'https://jbee.io/react?dateRange=2020-01-01&dateRange=2021-01-01&difficult=true';

describe('url parser test', () => {
  test('주어진 URL을 pathname과 query로 분리한다', () => {
    // Given, When, Then
    expect(parseUrl(쿼리가_없는_URL).originPath).toBe(originPath);
    expect(parseUrl(쿼리가_없는_URL).pathname).toBe(pathname);
    expect(parseUrl(쿼리가_없는_URL).query).toEqual({});

    expect(parseUrl(쿼리를_하나_포함한_URL).originPath).toBe(originPath);
    expect(parseUrl(쿼리를_하나_포함한_URL).pathname).toBe(pathname);
    expect(parseUrl(쿼리를_하나_포함한_URL).query).toEqual({
      easy: 'false',
    });

    expect(parseUrl(쿼리를_두개_포함한_URL).originPath).toBe(originPath);
    expect(parseUrl(쿼리를_두개_포함한_URL).pathname).toBe(pathname);
    expect(parseUrl(쿼리를_두개_포함한_URL).query).toEqual({
      easy: 'false',
      difficult: 'true',
    });
    expect(parseUrl(쿼리가_동일한_두개인_URL).originPath).toBe(originPath);
    expect(parseUrl(쿼리가_동일한_두개인_URL).pathname).toBe(pathname);
    expect(parseUrl(쿼리가_동일한_두개인_URL).query).toEqual({
      dateRange: ['2020-01-01', '2021-01-01'],
    });
    expect(parseUrl(쿼리가_동일한_두개_다른_하나_총_세_개_URL).originPath).toBe(originPath);
    expect(parseUrl(쿼리가_동일한_두개_다른_하나_총_세_개_URL).pathname).toBe(pathname);
    expect(parseUrl(쿼리가_동일한_두개_다른_하나_총_세_개_URL).query).toEqual({
      dateRange: ['2020-01-01', '2021-01-01'],
      difficult: 'true',
    });
  });
});
