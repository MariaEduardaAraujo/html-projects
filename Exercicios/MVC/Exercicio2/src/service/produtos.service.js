import { AppError } from "../utils/AppError.js"

export class ProdutosService{
    constructor(repository){
        this.repository = repository
    }
    async listarTodos(){
        return this.repository.listarTodos()
    }
    async buscarPorId(id){
        const produto = await this.repository.buscarPorId(id)
        if (!produto) throw new AppError("Este produto não existe",  404)
        return produto
    }
    async criar({nome, preco}) {
        const todos = await this.repository.listarTodos()
        const duplicado = todos.find((p) => p.nome === nome)

        if (duplicado) throw new AppError("Produto já cadastrado", 409)
        
        if (preco < 0) throw new AppError("Produto com preço inválido", 400)

        return this.repository.criar({nome, preco})
    }
}