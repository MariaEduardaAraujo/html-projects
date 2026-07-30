export class ProdutosRepository{
    constructor(database){
        this.database = database
    }

    async listarTodos(){
        return this.database.getProdutos()
    }
    async buscarPorId(id){
        return this.database.getProdutos().find((p) => p.id === id) ?? null
    }
    async criar(dados){
        const novoProduto = { id: this.database.generatedId(), ...dados }
        this.database.getProdutos().push(novoProduto)
        return novoProduto
    }
}