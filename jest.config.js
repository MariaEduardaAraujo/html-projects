import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })

export default {
  testEnvironment:    'node',
  transform:          {},
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.spec.js'],
  testPathIgnorePatterns: ['frontend/tests/e2e'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**',
    '!src/server.js',
  ],
  coverageThreshold: {
    './src/services/': { statements: 80 },
    './src/middlewares/': { statements: 85 },
    './src/utils/': { statements: 75 },
  },
  setupFilesAfterEnv: ['./tests/setup.js'],
}