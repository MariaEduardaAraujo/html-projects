import { prisma } from '../src/database/prisma.js'

beforeAll(async () => {
  // Para testes de integração, usa-se um banco SQLite em memória
  // configurado via variável de ambiente no ambiente de teste
});

afterAll(async () => {
  await prisma.$disconnect()
});