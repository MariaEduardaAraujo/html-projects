export class EstoqueRepository{
    constructor(database){
        this.database = database
    }
    
    async listar(){
        return this.database.getEstoque()
    }
    async buscarPorId(id){
        return this.database.getEstoque().find((e) => e.id === id) ?? null
    }
    async criar(dados){
        const novoLivro = { id: this.database.generateId(), ...dados }
        this.database.getEstoque().push(novoLivro)
        return novoLivro
    }
    async atualizarQuantidade(id, qtd){
        const estoque = this.database.getEstoque()
        const i = estoque.findIndex((e) => e.id === id)
        if (i === -1) return null
        estoque[i] = { ...estoque[i], ...{quantidade: qtd}, id}
        return estoque[i]
    }
    async darBaixa(id){
        /*const estoque = this.database.getEstoque()
        const i = estoque.findIndex((e) => e.id === id)
        if (i === -1) return null
        let qtd = estoque[i].quantidade
        estoque[i] = { ...estoque[i], ...{quantidade: qtd-1}, id}
        return estoque[i]*/
        
        const estoque = this.database.getEstoque()
        const i = estoque.findIndex((i) => i.id === id)
        estoque[i] = { ...estoque[i], ...{disponivel:false}, id }
        return estoque[i]
    }
}