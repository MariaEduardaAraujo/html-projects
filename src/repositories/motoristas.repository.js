import { IMotoristasRepository } from "../interfaces/IMotoristasRepository.js"

export class MotoristasRepository extends IMotoristasRepository{
    constructor(database){
        super()
        this.database = database
    }
    async listarTodos(){
        return this.database.getMotoristas()
    }
    async buscarPorId(id){
        return this.database.getMotoristas().find((i) => i.id === id) ?? null
    }
    async buscarPorCPF(cpf){
        return this.database.getMotoristas().find((c) => c.cpf === cpf) ?? null
    }
    async criar(dados){
        const motorista = this.database.getMotoristas()
        const novoMotorista = {
            id: this.database.generateMotoristaId(),
            ...dados,
            status: "ATIVO"
        }
        motorista.push(novoMotorista)
        return novoMotorista
    }
    async atualizar(id, dados){
        const motorista = this.database.getMotoristas()
        const i = motorista.findIndex((m) => m.id === id)
        if (i === -1) return null
        motorista[i] = { ...motorista[i], ...dados, id}
        return motorista[i]
    }
}