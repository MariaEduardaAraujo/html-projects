import { Router } from "express"
import { LivrosDatabase } from "../database/livros.database.js"
import { LivrosRepository } from "../repository/livros.repository.js"
import { LivrosService } from "../service/livros.service.js"
import { LivrosController } from "../controllers/livros.controller.js"

const db = new LivrosDatabase()
const repo = new LivrosRepository(db)
const service = new LivrosService(repo)
const controller = new LivrosController(service)

const router = Router()

router.get("/", controller.listar)
router.get("/:id", controller.buscarPorId)
router.post("/", controller.criar)
router.put("/:id", controller.atualizarQuantidade)
router.delete("/:id", controller.darBaixa)

export default router