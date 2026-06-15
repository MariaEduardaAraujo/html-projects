import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { AutenticacaoService } from '../../../src/services/auth.service.js';
import { AppError } from '../../../src/utils/AppError.js';
import bcrypt from 'bcrypt';

process.env.JWT_SECRET = 'segredo_teste';
process.env.JWT_EXPIRES_IN = '1h';

describe('EntregasService', () => {
    let service
    let usuariosRepo
    
    beforeEach(() => {
        usuariosRepo = {
            criar: jest.fn(),
            buscarPorEmail: jest.fn(),
        }
        service = new AutenticacaoService(usuariosRepo)
    })
    afterEach(()  => jest.clearAllMocks() )

    describe('Logar', () => {
        it('deve lançar AppError com status 401 se o e-mail não existir', async () => {
            usuariosRepo.buscarPorEmail.mockResolvedValue(null)
            const usuario = { email: 'nãoexistenobanco@email.com', senha: 'hash'}
        
            await expect(service.login(usuario))
                .rejects.toMatchObject({ mensagem: "Credenciais inválidas", status: 401})
        })

        it('deve lançar AppError com status 401 se a senha estiver incorreta', async () => {
            usuariosRepo.buscarPorEmail.mockResolvedValue({ id: 1, senhaHash: 'hash'})
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)
            const usuario = { email: 'nãoexistenobanco@email.com', senha: 'errada'}

            await expect(service.login(usuario))
                .rejects.toMatchObject({ mensagem: "Credenciais inválidas", status: 401})
        })

        it('deve retornar o accessToken, refreshToken e o objeto usuário para o login correto', async () => {
            usuariosRepo.buscarPorEmail.mockResolvedValue({ id: 1, nome: 'User', email: 'nãoexistenobanco@email.com', papel: 'OPERADOR', senhaHash: 'hash'})
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
            const resultado = await service.login({ email: 'nãoexistenobanco@email.com', senha: 'hash'})

            expect(resultado).toHaveProperty('accessToken')
        })

        it('não deve retornar o campo senha para o login correto', async () => {
            usuariosRepo.buscarPorEmail.mockResolvedValue({ id: 1, nome: 'User', email: 'nãoexistenobanco@email.com', papel: 'OPERADOR', senhaHash: 'hash'})
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
            const resultado = await service.login({ email: 'nãoexistenobanco@email.com', senha: 'hash'})

            expect(resultado).not.toHaveProperty('senha')
            expect(resultado).not.toHaveProperty('senhaHash')
        })
    })
    describe('Criar', () => {
        it('deve lançar AppError com status 409 se o e-mail já existir', async () => {
            const usuario = { email: 'nãoexistenobanco@email.com'}
            usuariosRepo.buscarPorEmail.mockResolvedValue({ id: 1, ...usuario })
        
            await expect(service.criar({ nome: 'Maria', ...usuario, senha: 'hash'}))
                .rejects.toMatchObject({ mensagem: "Credenciais inválidas", status: 409})
            expect(usuariosRepo.criar).not.toHaveBeenCalled()
        })
        it('deve chamar bcrypt antes de chmar repositorio.criar', async () => {
            usuariosRepo.buscarPorEmail.mockResolvedValue(null)
            const spy = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hash_falso')
            usuariosRepo.criar.mockResolvedValue({ id: 1})
        
            await service.criar({ nome: 'Maria', email: 'nãoexistenobanco@email.com', senha: 'hash'})

            expect(spy).toHaveBeenCalled()
            expect(usuariosRepo.criar).toHaveBeenCalledWith(
                expect.objectContaining({ senhaHash: 'hash_falso'})
            )
        })
    })
})

