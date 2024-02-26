import { config } from 'dotenv';

config();

export function loadEnv<K extends string>(propNames: readonly K[], strict = true) {
  const env: Record<string, unknown> = {};

  propNames.forEach(propName => {
    env[propName] = process.env[propName];
  });

  if (strict) {
    propNames.forEach(propName => {
      if (env[propName] == null) {
        throw new Error(`Environment variable ${propName} is not defined`);
      }
    });
  }

  return env as Record<K, string>;
}
