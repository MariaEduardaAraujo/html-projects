import { Router } from "express"
import { ProdutosDatabase } from "../database/database.js"
import { ProdutosRepository } from "../repository/produtos.repository.js"
import { ProdutosService } from "../service/produtos.service.js"
import { ProdutosController } from "../controllers/produtos.controller.js"

const db = new ProdutosDatabase()
const repository = new ProdutosRepository(db)
const service = new ProdutosService(repository)
const controller = new ProdutosController(service)

const router = Router()

router.get("/", controller.listarTodos)
router.get("/:id", controller.buscarPorId)
router.post("/", controller.criar)

export default router