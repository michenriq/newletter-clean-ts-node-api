module.exports = {
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!**/test/**",
    "!**/config/**",
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
};
