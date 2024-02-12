const { buildJestConfig } = require("@awesome-dev/jest");

module.exports = buildJestConfig({
  transformer: "ts",
});
