import { describe, expect, it } from '@jest/globals';
import { toKebabCase } from './toKebabCase';

describe('toKebabCase', () => {
  it('파크칼 케이스 변환 성공', () => {
    const given = 'ChoiSumin';

    const result = toKebabCase(given);

    expect(result).toBe('choi-sumin');
  });

  it('파크칼 케이스 변환 성공 - capitalize', () => {
    const given = 'ChoiSumin';

    const result = toKebabCase(given, { capitalize: true });

    expect(result).toBe('CHOI-SUMIN');
  });

  it('스네이크 케이스 변환 성공', () => {
    const given = 'choi_sumin';

    const result = toKebabCase(given);

    expect(result).toBe('choi-sumin');
  });

  it('스네이크 케이스 변환 성공 - capitalize', () => {
    const given = 'choi_sumin';

    const result = toKebabCase(given, { capitalize: true });

    expect(result).toBe('CHOI-SUMIN');
  });

  it('띄어쓰기 변환 성공', () => {
    const given = 'Choi Sumin';

    const result = toKebabCase(given);

    expect(result).toBe('choi-sumin');
  });

  it('띄어쓰기 변환 성공 - capitalize', () => {
    const given = 'Choi Sumin';

    const result = toKebabCase(given, { capitalize: true });

    expect(result).toBe('CHOI-SUMIN');
  });

  it('섞었을 때 변환 성공', () => {
    const given = 'ChoiSumin is good_Developer';

    const result = toKebabCase(given);

    expect(result).toBe('choi-sumin-is-good-developer');
  });
});
