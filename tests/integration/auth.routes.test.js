import request from 'supertest'
import app from '../../app.js'
import prisma from '../../src/database/prisma.js'
import { expect } from '@jest/globals'

process.env.JWT_SECRET = 'segredo_para_testes_apenas';
process.env.JWT_EXPIRES_IN = '1h';

describe('Auth Routes', () => {
    beforeEach(async () => {
        await prisma.usuario.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    describe('POST/api/auth/register', () => {
        it ('deve retornar 201 se a entrada de dados for válida', async () => {
            const res = await request(app)
                .post('/api/auth/registrar')
                .send({ nome: 'Maria', email: 'nãoexistenobanco@email.com', senha: 'hash_senha'})

            expect(res.status).toBe(201)
            expect(res.body).not.toHaveProperty('senha')
        })

        it ('deve retornar 400 se a senha for menor que 8 caracteres', async () => {
            const res = await request(app)
                .post('/api/auth/registrar')
                .send({ nome: 'Maria', email: 'nãoexistenobanco@email.com', senha: 'hash'})

            expect(res.status).toBe(400)
        })

        it ('deve retornar 409 se o email já estiver cadastrado', async () => {
            await request(app).post('/api/auth/registrar').send({ nome: 'Maria', email: 'nãoexistenobanco@email.com', senha: 'hash_senha'})
            
            const res = await request(app)
                .post('/api/auth/registrar')
                .send({ nome: 'Maria', email: 'nãoexistenobanco@email.com', senha: 'hash_senha' })

            expect(res.status).toBe(409)
        })
    })

    describe('POST /api/auth/login', () =>{
        beforeEach(async () => {
            const res = await request(app)
                .post('/api/auth/registrar')
                .send({ nome: 'Maria', email: 'maria@email.com', senha: 'hash_senha' })
        })

        it('deve retornar 200 se as credenciais forem válidas', async () =>{
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'maria@email.com', senha: 'hash_senha' })
            
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('accessToken')
        })

        it('deve retornar 401 se as senha for inválida', async () =>{
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'nãoexistenobanco@email.com', senha: 'senha_hash' })
            
            expect(res.status).toBe(401)
            expect(res.body.mensagem).toBe('Credenciais inválidas')
        })

        it('deve retornar 401 se o email for invalido', async () =>{
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'nãoexistenobancomesmo@email.com', senha: 'hash_senha' })
            
            expect(res.status).toBe(401)
            expect(res.body.mensagem).toBe('Credenciais inválidas')
        })
    })
})