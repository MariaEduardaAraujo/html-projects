import { Router } from "express"
import { ReservasRepository } from "../repositories/reservas.repositories.js"
import { ReservasService } from "../service/reservas.service.js"
import { ReservasController } from "../controller/reservas.controller.js"
import { validaIdMiddleware } from "../middlewares/validarId.middleware.js"
import { validaReservaMiddleware } from "../middlewares/validarReserva.middleware.js"
import { validaReservaExistenteMiddleware } from "../middlewares/validarReservaExistente.middleware.js"

const repository = new ReservasRepository()
const service = new ReservasService(repository)
const controller = new ReservasController(service)

const router = Router()

router.get('/', controller.listarTodos)
router.get('/:id', validaIdMiddleware, validaReservaExistenteMiddleware, controller.buscarPorId)
router.post('/', validaReservaMiddleware, controller.criar)
router.put('/:id', validaIdMiddleware, validaReservaExistenteMiddleware, controller.atualizar)
router.delete('/:id', validaIdMiddleware, validaReservaExistenteMiddleware, controller.remover)
router.patch('/:id/cancelar', validaIdMiddleware, validaReservaExistenteMiddleware, controller.cancelar)
router.patch('/:id/reativar', validaIdMiddleware, validaReservaExistenteMiddleware, controller.reativar)
 
export default router