import { IEntregasRepository } from "../interfaces/IEntregasRepository.js"

export class EntregasRepository extends IEntregasRepository{
    constructor(database){
        super()
        this.database = database
    }
    async listarTodos(){
        return this.database.getEntregas()
    }
    async buscarPorId(id){
        return this.database.getEntregas().find((e) => e.id === id) ?? null
    }
    async criar(dados){
        const entregas = this.database.getEntregas()
        const novaEntrega = {
            id: this.database.generateId(),
            ...dados,
            status:  "CRIADA",
            historico: [{
                data: new Date().toISOString(),
                descricao: "Entrega Criada" 
            }]
        }
        entregas.push(novaEntrega)
        return novaEntrega
    }
    async atualizar(id, dados){
        const entregas = this.database.getEntregas()
        const i = entregas.findIndex((e) => e.id === id)
        if (i === -1) return null
        entregas[i] = { ...entregas[i], ...dados, id}
        return entregas[i]
    }
}