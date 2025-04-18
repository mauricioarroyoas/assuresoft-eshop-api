module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/tests/setup.ts',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts']
};