import request from 'supertest'
import app from '../../app.js'
import prisma from '../../src/database/prisma.js'
import { beforeEach, describe, expect } from '@jest/globals'
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'segredo_para_testes_apenas'
process.env.JWT_EXPIRES_IN = '1h'

let tokenOperador, tokenGestor

describe('Entregas Routes', () =>{
    beforeEach(async () => {
    await prisma.entrega.deleteMany()
    await prisma.usuario.deleteMany()
    
    await request(app).post('/api/auth/registrar')
        .send({ nome: 'Operador', email: 'operador@email.com', senha: 'hash_senha', papel: 'OPERADOR' })
    await request(app).post('/api/auth/registrar')
        .send({ nome: 'Gestor', email: 'gestor@email.com', senha: 'hash_senha', papel: 'GESTOR' })

    const resOp = await request(app).post('/api/auth/login')
        .send({ email: 'operador@email.com', senha: 'hash_senha' })
    const resGe = await request(app).post('/api/auth/login')
        .send({ email: 'gestor@email.com', senha: 'hash_senha' })

    tokenOperador = resOp.body.accessToken
    tokenGestor = resGe.body.accessToken
    })

    afterAll(async () => {
        await prisma.usuario.deleteMany()
        await prisma.$disconnect()
    })

    describe('Rotas protegidas', () => {
        it('deve exibir status 401 caso o token no login não exista', async () => {
            const res = await request(app).get('/api/entregas')
            
            expect(res.status).toBe(401)
        })

        it('deve exibir status 401 caso o token no login não seja válido', async () => {
            const res = await request(app)
                .get('/api/entregas')
                .set('Authorization', 'Bearer token.invalido.aqui')
            
            expect(res.status).toBe(401)
        })

        it('deve exibir status 401 caso o token no login esteja expirado', async () => {
            const tokenExpirado = jwt.sign(
                { sub: 1, papel: 'OPERADOR' },
                process.env.JWT_SECRET,
                { expiresIn: -1 }
            )

            const res = await request(app)
                .get('/api/entregas')
                .set('Authorization', `Bearer ${tokenExpirado}`)
            
            expect(res.status).toBe(401)
            expect(res.body.mensagem).toMatch(/expirado/i)
        })

        it('deve mostrar status 403 se um OPERADOR tentar acessar uma rota de GESTOR', async () => {
            const resEntrega = await request(app)
                .post('/api/entregas')
                .set('Authorization', `Bearer ${tokenOperador}`)
                .send({ descricao: 'Caixas', origem: 'Maceió', destino: 'Recife' })

            const res = await request(app)
                .patch(`/api/entregas/${resEntrega.body.id}/cancelar`)
                .set('Authorization', `Bearer ${tokenOperador}`)
            
            expect(res.status).toBe(403)
        })

        it('deve mostrar status 200 GESTOR cancelar entrega', async () => {
            const resEntrega = await request(app)
                .post('/api/entregas')
                .set('Authorization', `Bearer ${tokenGestor}`)
                .send({ descricao: 'Caixas', origem: 'Maceió', destino: 'Recife' })

            const res = await request(app)
                .patch(`/api/entregas/${resEntrega.body.id}/cancelar`)
                .set('Authorization', `Bearer ${tokenGestor}`)
            expect(res.status).toBe(200)
        })
    })
})