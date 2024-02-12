const { buildJestConfig } = require('./src/buildJestConfig');

module.exports = buildJestConfig({
  testEnvironment: 'node',
  transformer: 'ts',
});
