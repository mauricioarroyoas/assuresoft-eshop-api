import type { Config } from "jest";

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "src/**/*.ts",             
    "!src/**/*.spec.ts",       //! sign is used to ignore files/paths we do not want to tset 
    "!src/index.ts",
    "!src/app.ts",  
    "!src/data-source.ts",  
    "!src/entities/**/*.ts",
    "!src/migrations/**/*.ts",
    "!src/seeds/**/*.ts",
  ],
  coverageDirectory: "coverage",
};


export default config;