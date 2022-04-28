const { defaults: tsjPreset } = require('ts-jest/presets');
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'jsdom',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverage: false,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/index.tsx',
    '!src/**/index.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 40,
      statements: 50,
    },
  },

  transform: {
    ...tsjPreset.transform,
    '\\.(svg)$': '<rootDir>/jest/jest.transformer.js',
    // to enable css module snapshots, see https://github.com/keyz/identity-obj-proxy/issues/8
    '\\.(css||scss)$': '<rootDir>/jest/jest.transformer.stub.js',
  },

  setupFilesAfterEnv: [require.resolve('./jest/jest.setup.js')],
};
