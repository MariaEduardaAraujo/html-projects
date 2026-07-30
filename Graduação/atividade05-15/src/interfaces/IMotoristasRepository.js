/**
 * @typedef {Object} Motorista
 * @property {string} nome
 * @property {string} cpf
 * @property {string} placaVeiculo
 * @property {string} status
 */

export class IMotoristasRepository{
    /**
     * @param {{ status?: string }} filtros
     * @returns {Promise<Motorista[]>}
     */
    async listarTodos() {
        throw new Error("Método listarTodos() não implementado")
    }
    /**
     * @param {number} id
     * @returns {Promise<Motorista|null>}
     */
    async buscarPorId(id) {
        throw new Error("Método buscarPorId() não implementado")
    }
    /**
     * @param {string} cpf
     * @returns {Promise<Motorista|null>}
     */
    async buscarPorCPF(cpf) {
        throw new Error("Método buscarPorCPF() não implementado")
    }
    /**
     * @param {Object} dados
     * @returns {Promise<Motorista>}
     */
    async criar(dados) {
        throw new Error("Método criar() não implementado")
    }
    /**
     * @param {number} id
     * @param {Object} dados
     * @returns {Promise<Motorista>}
     */
    async atualizar(id, dados) {
        throw new Error("Método atualizar() não implementado")
    }
}