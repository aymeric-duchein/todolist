module.exports = {
  preset: "jest-preset-angular",
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      astTransformers: ['jest-preset-angular/InlineHtmlStripStylesTransformer.js']
    }
  },
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  coverageReporters: ['html', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!**/*.module.ts",
    "!**/main.ts",
    "!**/polyfills.ts",
    "!**/test-setup.ts",
    "!**/*mocks.ts",
    "!**/environments/**",
    "!**/node_modules/**",
    "!**/mock-data/**",
  ],
  moduleNameMapper: {
    "@mock-data/(.*)$": "<rootDir>/mock-data/$1"
  },
  clearMocks: true
};

