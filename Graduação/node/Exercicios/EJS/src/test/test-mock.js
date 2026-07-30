import { LivrosService } from "../service/livros.service.js"

const mockRepository = {
    listarTodos: async () => [],
    buscarPorId: async (id) => null,
    criar: async (dados) => ({ id: 1, ...dados }),
    atualizarQuantidade: async (id, dados) => ({ id, ...dados }),
    darBaixa: async (id) => true
}

const service = new LivrosService(mockRepository)

// Testa criar
const livro = await service.criar({ titulo: "Clean Code", autor: "Robert Martin", preco: 50, quantidade: 10 })
console.log("Criado:", livro)

// Testa preço negativo — deve lançar AppError
try {
    await service.criar({ titulo: "Teste", autor: "Autor", preco: -1, quantidade: 5 })
} catch (err) {
    console.log("Erro esperado:", err.mensagem)
}