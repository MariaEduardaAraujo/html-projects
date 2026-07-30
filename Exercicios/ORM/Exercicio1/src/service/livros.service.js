import { AppError } from "../utils/AppError.js"

export class LivrosService{
    constructor(repository){
        this.repository = repository
    }
    async listar({disponivel, autor} = {}){
        let livros = await this.repository.listar()

        if(disponivel !== undefined){
            livros = livros.filter((l) => l.disponivel === "true")
        }
        if(autor !== undefined){
            livros = livros.filter((l) => l.autor === autor)
        }
        return livros
    }
    async buscarPorId(id){
        const livro = await this.repository.buscarPorId(id)
        if (!livro) throw new AppError("Este livro não está no estoque", 404)
        return livro
    }
    async criar({titulo, autor, preco, quantidade}){
        if (preco < 0) throw new AppError("O preço não pode ser negativo", 400)
        if (quantidade < 0) throw new AppError("A quantidade não pode ser negativa", 400)
        
        const livros = await this.repository.listar()
        const duplicado = livros.filter((l) => l.titulo === titulo && l.autor === autor)
        if (duplicado) throw new AppError("Já existe um livro com esse título e autor", 409)

        return this.repository.criar({titulo, autor, preco, quantidade, disponivel: true})
    }
    async atualizarQuantidade(id, qtd){
        const livro = await this.buscarPorId(id)
        if (qtd < 0){
            throw new AppError("A quantidade não pode ser menor que zero", 409); 
        }
        livro.quantidade = qtd
        return livro
    }
    async darBaixa(id){
        const livro = await this.buscarPorId(id)
        if (livro.disponivel === false){
            throw new AppError("Este livro já sofreu baixa", 409);
        }
        livro.disponivel = false
        return livro
    }
}