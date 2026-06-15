import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })

export default {
  testEnvironment:    'node',
  transform:          {},              // sem transpilação — Node nativo com ESM
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.spec.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**',                  // exclui arquivos de configuração
    '!src/server.js',                  // exclui ponto de entrada
  ],
  coverageThresholds: {
    global: {
      statements: 80,
      branches:   75,
      functions:  80,
      lines:      80,
    },
  },
  setupFilesAfterEnv: ['./tests/setup.js'],
}