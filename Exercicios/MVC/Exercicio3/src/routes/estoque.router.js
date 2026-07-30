import { Router } from "express"
import { EstoqueDatabase } from "../database/estoque.database.js"
import { EstoqueRepository } from "../repository/estoque.repository.js"
import { EstoqueService } from "../service/livros.service.js"
import { EstoqueController } from "../controllers/estoque.controller.js"

const db = new EstoqueDatabase()
const repo = new EstoqueRepository(db)
const service = new EstoqueService(repo)
const controller = new EstoqueController(service)

const router = Router()

router.get("/", controller.listar)
router.get("/:id", controller.buscarPorId)
router.post("/", controller.criar)
router.put("/:id", controller.atualizarQuantidade)
router.delete("/:id", controller.darBaixa)

export default router