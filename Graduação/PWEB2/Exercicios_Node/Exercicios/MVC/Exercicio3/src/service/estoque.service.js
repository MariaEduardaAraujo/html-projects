import { AppError } from "../utils/AppError.js"

export class EstoqueService{
    constructor(repository){
        this.repository = repository
    }
    async listar({ disponivel, autor} = {}){
        let estoque = await this.repository.listar()

        if (disponivel !== undefined){
            estoque = estoque.filter((e) => e.disponivel === "true")
        }
        if (autor !== undefined){
            estoque = estoque.filter((e) => e.autor === autor)
        }
        return estoque
    }
    async buscarPorId(id){
        const estoque = await this.repository.buscarPorId(id)
        if (!estoque) throw new AppError("Este livro não está no estoque", 404)
        return estoque
    }
    async criar({titulo, autor, preco, quantidade}){
        if (preco < 0) throw new AppError("O preço não pode ser negativo", 400)
        
        if (quantidade < 0) throw new AppError("A quantidade não pode ser negativa", 400)
        
        return this.repository.criar({titulo, autor, preco, quantidade, disponivel: true})
    }
    async atualizarQuantidade(id, qtd){
        const estoque = await this.buscarPorId(id)
        if (qtd < 0){
            throw new AppError("A quantidade não pode ser menor que zero", 409); 
        }
        estoque.quantidade = qtd
        return estoque
    }
    async darBaixa(id){
        const estoque = await this.buscarPorId(id)
        if (estoque.disponivel === false){
            throw new AppError("Este livro já sofreu baixa", 409);
        }
        estoque.disponivel = false
        return estoque
    }
}