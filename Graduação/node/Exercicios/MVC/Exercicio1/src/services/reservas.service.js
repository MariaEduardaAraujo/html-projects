import { AppError } from "../utils/AppErro.js"

export class ReservasService{
    constructor(repository){
        this.repository = repository
    }
    async listarTodos({ ativa, capacidadeMin, turno } = {}){
        let reservas = await this.repository.listarTodos()

        if (ativa !== undefined){
            reservas = reservas.filter((r) => String(r.ativa) === ativa)
        }

        if (turno){
            reservas = reservas.filter((r) => r.turno === turno)
        }

        if (capacidadeMin){
            reservas = reservas.filter((r) => r.capacidade >= Number(capacidadeMin))
        }

        return reservas
    }
    async buscarPorId(id){
        const reserva = await this.repository.buscarPorId(id)
        if (!reserva) throw new AppError("Reserva não encontrada", 404)
    }
    async criar(dados){
        return this.repository.criar(dados)
    }
    async atualizar(id, dados){
        await this.buscarPorId(id)
        return this.repository.atualizar(id, dados)
    }
    async remover(id){
        await this.buscarPorId(id)
        return this.repository.remover(id)
    }
    async cancelar(id){
        await this.buscarPorId(id)
        return this.repository.cancelar(id)
    }
    async reativar(id){
        await this.buscarPorId(id)
        return this.repository.reativar(id)
    }
}