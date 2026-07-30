import { ILivrosRepository } from "./interfaces/ILivrosRepository.js"
import { prisma } from "../config/database.js"

export class LivrosRepositoryPrisma extends ILivrosRepository{
    async listar(){
        const livros = await prisma.livro.findMany()
        return livros
    }
    async buscarPorId(id){
        const livro = await prisma.livro.findUnique({where: {id: id}})
        return livro
    }
    async criar(dados){
        const novoLivro = await prisma.livro.create({data: dados})
        return novoLivro
    }
    async atualizarQuantidade(id, qtd){
       const atualizar = await prisma.livro.update({where: {id: id}, data: {quantidade: qtd}})
       return atualizar
    }
    async darBaixa(id){
        const baixa = await prisma.livro.update({where: {id: id}, data: {quantidade: {decrement: 1}}})
        return baixa
    }
}