/**
 * @typedef {Object} Entrega
 * @property {number} id
 * @property {string} descricao
 * @property {string} origem
 * @property {string} destino
 * @property {string} status
 * @property {number|null} motoristaId
 * @property {Array} historico
 */

export class IEntregasRepository{
     /**
     * @param {{ status?: string }} filtros
     * @returns {Promise<Entrega[]>}
     */
    async listarTodos() {
        throw new Error("Método listarTodos() não implementado")
    }
    /**
     * @param {number} id
     * @returns {Promise<Entrega|null>}
     */
    async buscarPorId(id) {
        throw new Error("Método buscarPorId() não implementado")
    }
    /**
     * @param {Object} dados
     * @returns {Promise<Entrega>}
     */
    async criar(dados) {
        throw new Error("Método criar() não implementado")
    }
    /**
     * @param {number} id
     * @param {Object} dados
     * @returns {Promise<Entrega>}
     */
    async atualizar(id, dados) {
        throw new Error("Método atualizar() não implementado")
    }
}