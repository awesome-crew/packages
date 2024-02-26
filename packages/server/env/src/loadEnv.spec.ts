import { describe, beforeEach, it, expect } from '@jest/globals';
import { loadEnv } from './loadEnv';

describe('loadEnv', () => {
  beforeEach(() => {
    process.env = {};
  });

  it('should load env', () => {
    // given
    process.env.NODE_ENV = 'test';
    process.env.PORT = '3000';

    const result = loadEnv(['NODE_ENV', 'PORT']);

    expect(result).toEqual({
      NODE_ENV: 'test',
      PORT: '3000',
    });
  });

  it('should throw error when strict is true', () => {
    // given
    process.env.NODE_ENV = 'test';

    // when
    const result = () => loadEnv(['NODE_ENV', 'PORT']);

    // then
    expect(result).toThrow();
  });
});
