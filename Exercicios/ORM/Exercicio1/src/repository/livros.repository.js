import { ILivrosRepository } from "./interfaces/ILivrosRepository.js"

export class LivrosRepository extends ILivrosRepository{
    constructor(database){
        this.database = database
    }
    
    async listar(){
        return this.database.getLivro()
    }
    async buscarPorId(id){
        return this.database.getLivro().find((e) => e.id === id) ?? null
    }
    async criar(dados){
        const novoLivro = { id: this.database.generateId(), ...dados }
        this.database.getLivro().push(novoLivro)
        return novoLivro
    }
    async atualizarQuantidade(id, qtd){
        const livro = this.database.getLivro()
        const i = livro.findIndex((e) => e.id === id)
        if (i === -1) return null
        livro[i] = { ...livro[i], ...{quantidade: qtd}, id}
        return livro[i]
    }
    async darBaixa(id){
        /*const estoque = this.database.getEstoque()
        const i = estoque.findIndex((e) => e.id === id)
        if (i === -1) return null
        let qtd = estoque[i].quantidade
        estoque[i] = { ...estoque[i], ...{quantidade: qtd-1}, id}
        return estoque[i]*/
        
        const livro = this.database.getLivro()
        const i = livro.findIndex((i) => i.id === id)
        livro[i] = { ...livro[i], ...{disponivel:false}, id }
        return livro[i]
    }
}