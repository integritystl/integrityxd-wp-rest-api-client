module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(msw|@mswjs|until-async|rettime|@open-draft)/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
};
