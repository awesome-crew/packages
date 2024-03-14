import { describe, it, expect } from '@jest/globals';

import { parseSeconds } from './parseSeconds';

describe('parseSeconds', () => {
  it('10은 seconds: 10, minutes: 0 이 된다.', () => {
    const result = parseSeconds(10);

    expect(result.seconds).toBe('10');
    expect(result.minutes).toBe('0');
  });

  it('61은 seconds: 1, minutes: 1 이 된다.', () => {
    const result = parseSeconds(61);

    expect(result.seconds).toBe('1');
    expect(result.minutes).toBe('1');
  });

  it('131은 seconds: 11, minutes: 2 이 된다.', () => {
    const result = parseSeconds(131);

    expect(result.seconds).toBe('11');
    expect(result.minutes).toBe('2');
  });

  it('10은 seconds: 10, minutes: 00 이 된다. (pad)', () => {
    const result = parseSeconds(10, { pad: true });

    expect(result.seconds).toBe('10');
    expect(result.minutes).toBe('00');
  });

  it('61은 seconds: 01, minutes: 01 이 된다. (pad)', () => {
    const result = parseSeconds(61, { pad: true });

    expect(result.seconds).toBe('01');
    expect(result.minutes).toBe('01');
  });

  it('61은 seconds: 1, minutes: 01 이 된다. (minutesPad)', () => {
    const result = parseSeconds(61, { minutesPad: true });

    expect(result.seconds).toBe('1');
    expect(result.minutes).toBe('01');
  });

  it('131은 seconds: 11, minutes: 02 이 된다. (pad)', () => {
    const result = parseSeconds(131, { pad: true });

    expect(result.seconds).toBe('11');
    expect(result.minutes).toBe('02');
  });

  it('131은 seconds: 11, minutes: 2 이 된다. (secondsPad)', () => {
    const result = parseSeconds(131, { secondsPad: true });

    expect(result.seconds).toBe('11');
    expect(result.minutes).toBe('2');
  });
});
