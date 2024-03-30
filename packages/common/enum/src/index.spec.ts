import { describe, it, expect } from '@jest/globals';

import { createEnum } from './index';

describe('createEnum', () => {
  it('should return an object with the same keys and values as the input array', () => {
    const days = createEnum([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);

    expect(days).toEqual({
      Monday: 'Monday',
      Tuesday: 'Tuesday',
      Wednesday: 'Wednesday',
      Thursday: 'Thursday',
      Friday: 'Friday',
      Saturday: 'Saturday',
      Sunday: 'Sunday',
    });
  });
});
