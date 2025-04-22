import type { Config } from "jest";

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "src/**/*.ts",             // adjust this to match your code folder
    "!src/**/index.ts",        // optional: ignore entry points
    "!src/**/*.spec.ts"        // ignore test files themselves
  ],
  coverageDirectory: "coverage",
};


export default config;