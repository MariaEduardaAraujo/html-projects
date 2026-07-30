import { EstoqueDatabase } from "./database/estoque.database.js"
import { EstoqueRepository } from "./repository/estoque.repository.js"
import { EstoqueService } from "./service/estoque.service.js"

const db = new EstoqueDatabase()
const repo = new EstoqueRepository(db)
const service = new EstoqueService(repo)

const livro = await service.criar({ titulo: "Titulo Teste", autor: "Autor Teste", preco: "25", quantidade: "10", disponivel: true })
console.log(livro)
console.log(await service.listar())
console.log(await service.atualizarQuantidade(1, 5))
console.log(await service.darBaixa(1))