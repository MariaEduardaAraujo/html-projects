import { AppError } from "../utils/AppError.js"

export class MotoristasService{
    constructor(repository, entregasRepository){
        this.repository = repository
        this.entregasRepository = entregasRepository
    }
    async listarTodos(){
        return this.repository.listarTodos()
    }
    async listarEntregas(id, { status } = {}){
        await this.buscarPorId(id)
        let entregas = await this.entregasRepository.listarTodos()

        entregas = entregas.filter((e) => e.motoristaId === id)
        if (status) {
            entregas = entregas.filter((e) => e.status === status)
        }
        return entregas
    }
    async buscarPorId(id){
        const motorista = await this.repository.buscarPorId(id)
        if (!motorista) throw new AppError("Motorista não encontrado", 404);
        return motorista        
    }
    async buscarPorCPF(cpf){
        const motorista = await this.repository.buscarPorCPF(cpf)
        if (!motorista) throw new AppError("Motorista não encontrado", 404);
        return motorista   
    }
    async criar({ nome, cpf, placaVeiculo }){
        const motoristas = await this.repository.listarTodos()
        const cpfDuplicado = motoristas.find((m) => m.cpf === cpf)
        if(cpfDuplicado){
            throw new AppError("CPF duplicado", 409);
                
        }
        return this.repository.criar({ nome, cpf, placaVeiculo })
    }
    async atualizar(id, dados){
        await this.buscarPorId(id)
        return this.repository.atualizar(id, dados)
    }
} 