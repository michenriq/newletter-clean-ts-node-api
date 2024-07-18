module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir/src/**/*.ts>",
    "!**/test/**",
    '!**/config/**'
  ],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
