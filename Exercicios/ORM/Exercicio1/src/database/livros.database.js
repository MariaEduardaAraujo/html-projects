export class LivroDatabase{
    constructor(){
        this.estoque = []
        this.nextId = 1
    }
    getLivro(){
        return this.estoque
    }
    generateId(){
        return this.nextId++
    }
}