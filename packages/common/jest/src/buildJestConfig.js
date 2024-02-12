const isCI = process.env.CI === `true`;

const baseConfig = {
  maxWorkers: isCI ? 1 : '50%',
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'mjs'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/src/**/*.(spec|test).(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/esm/', '/e2e/'],
};

function buildBabelJestConfig(config = {}) {
  const { transform, ...restConfig } = config;

  return {
    ...baseConfig,
    ...restConfig,
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.tsx?$': 'babel-jest',
      ...transform,
    },
  };
}

function buildSwcJestConfig(config = {}) {
  const { transform, ...restConfig } = config;

  return {
    ...baseConfig,
    ...restConfig,
    transform: {
      '^.+\\.js$': '@swc/jest',
      '^.+\\.tsx?$': '@swc/jest',
      ...transform,
    },
  };
}

function buildTsJestConfig(config = {}) {
  const { transform, ...restConfig } = config;

  return {
    ...baseConfig,
    ...restConfig,
    transform: {
      '^.+\\.js$': 'ts-jest',
      '^.+\\.tsx?$': 'ts-jest',
      ...transform,
    },
  };
}

exports.buildJestConfig = function buildJestConfig({ transformer, ...config }) {
  switch (transformer) {
    case 'swc':
      return buildSwcJestConfig(config);
    case 'ts':
      return buildTsJestConfig(config);
    case 'babel':
    default:
      return buildBabelJestConfig(config);
  }
};
