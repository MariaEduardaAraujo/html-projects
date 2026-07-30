export class EstoqueDatabase{
    constructor(){
        this.estoque = []
        this.nextId = 1
    }
    getEstoque(){
        return this.estoque
    }
    generateId(){
        return this.nextId++
    }
}