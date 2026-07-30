export class ReservasRepository {
    constructor(){
        this.reservas = []
        this.proximoId = 1
    }
    async listarTodos(){
        return this.reservas
    }
    async buscarPorId(id){
        return this.reservas.find((r) => r.id === id) ?? null
    }
    async criar(dados){
        const novaReserva = {
            id: this.proximoId++,
            ...dados, 
            ativa: true,
            dataCriacao: new Date().toISOString()
        }
        this.reservas.push(novaReserva)
        return novaReserva
    }
    async atualizar(id, dados){
        const i = this.reservas.findIndex((r) => r.id === id)
        if (i === -1) return null
        this.reservas[i] = { ...this.reservas[i], ...dados, id }
        return this.reservas[i]
    }
    async cancelar(id){
        return this.atualizar(id, { ativa: false })
    }
    async reativar(id){
        return this.atualizar(id, { ativa: true })
    }
}