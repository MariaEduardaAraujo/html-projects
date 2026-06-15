import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { EntregasService } from '../../../src/services/entregas.service.js';
import { AppError } from '../../../src/utils/AppError.js';

describe('EntregasService', () => {
    let service
    let entregasRepo
    let motoristasRepo
    
    beforeEach(() => {
        entregasRepo = {
        criar: jest.fn(),
        listarTodos: jest.fn(),
        buscarPorId: jest.fn(),
        atualizar: jest.fn(),
        }
        motoristasRepo = {
            buscarPorId: jest.fn(),
        }
        service = new EntregasService(entregasRepo, motoristasRepo)
    })
    afterEach(()  => { jest.clearAllMocks() })

    describe('Criar', () => {
        it('deve lançar AppError com status 400 se a origem ou o destino forem iguais', async () => {
        const novaEntrega = { descricao: 'Caixas de Medicamentos', origem:'Maceió', destino: 'Maceió' }
        const repositorioFalso = { criar: jest.fn().mockResolvedValue(novaEntrega) }
        const service = new EntregasService(repositorioFalso)

        await expect(service.criar(novaEntrega))
            .rejects.toMatchObject({ mensagem: "Origem e Destino não podem ser iguais", status: 400})
        })

        it('deve lançar AppError com status 409 se a entrega for duplicada para o mesmo motorista', async () => {
            const dados = { descricao: 'Caixas de Medicamentos', origem:'Maceió', destino: 'Recife', motoristaId: 1 }
            entregasRepo.listarTodos.mockResolvedValue({
                data: [{ descricao: 'Caixas de Medicamentos', origem: 'Maceió', destino: 'Recife', status: 'CRIADA' }]
            })
            await expect(service.criar(dados))
                .rejects.toMatchObject({ mensagem: "Existe uma entrega ativa com a mesma descrição, origem e destino", status: 409 });
        })
    })
    describe('Avançar', () => {
        it('deve simular uma entrega na transição de CRIADA para EM_TRÂNSITO', async () => {
            const entrega = { id: 1, status: 'CRIADA', motoristaId: 1 }
            const atualizada = { ...entrega, status: 'EM_TRANSITO' }
            entregasRepo.buscarPorId.mockResolvedValue(entrega)
            entregasRepo.atualizar.mockResolvedValue(atualizada)

            const resultado = await service.avancar(1)
            
            expect(resultado.status).toBe('EM_TRANSITO')
        })
        it ('deve simular uma entrega na transição de EM_TRÂNSITO para ENTREGUE', async() => {
            const entrega = { id: 1, status: 'EM_TRANSITO', motoristaId: 1 }
            const atualizada = { ...entrega, status: 'ENTREGUE', dataEntrega: new Date() }
            entregasRepo.buscarPorId.mockResolvedValue(entrega)
            entregasRepo.atualizar.mockResolvedValue(atualizada)

            const resultado = await service.avancar(1)
            
            expect(resultado.status).toBe('ENTREGUE')
            expect(resultado.dataEntrega).toBeDefined()
        })
        it ('deve lançar AppError com status 400 se a transição de status de uma entrega finalizada aconteça', async() => {
            const entrega = { id: 1, status: 'ENTREGUE', motoristaId: 1 }
            entregasRepo.buscarPorId.mockResolvedValue(entrega)
            
            await expect(service.avancar(1)).
                rejects.toMatchObject({ mensagem: "Não é possível avançar uma entrega com status ENTREGUE", status: 400 })
        })
        //it ('deve lançar AppError com status 400 se uma entrega CRIADA passar para ENTREGUE', async() => {})
    })
    describe('Cancelar', () =>{
        it ('deve ser possível cancelar uma entrega com status CRIADA', async() =>{
            const entrega = { id: 1, status: 'CRIADA' }
            entregasRepo.buscarPorId.mockResolvedValue(entrega)
            entregasRepo.atualizar.mockResolvedValue({ id: 1, status: 'CANCELADA'})

            const resultado = await service.cancelar(1)

            expect(resultado.status).toBe("CANCELADA")
        })
        it ('deve lançar AppError com status 400 ao tentar cancelar uma entrega com status ENTREGUE', async() => {
            entregasRepo.buscarPorId.mockResolvedValue({ id: 1, status: 'ENTREGUE' })
            
            await expect(service.cancelar(1))
                .rejects.toMatchObject({ mensagem: "Não é possível cancelar", status: 400})
        })
    })
})

