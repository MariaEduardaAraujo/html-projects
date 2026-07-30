export class ProdutosDatabase{
    constructor(){
        this.produtos = []
        this.nextId = 1
    }

    getProdutos(){
        return this.produtos
    }
    generatedId(){
        return this.nextId++
    }
}