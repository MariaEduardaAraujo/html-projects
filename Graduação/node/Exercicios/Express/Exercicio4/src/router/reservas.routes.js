import { Router } from "express"
import { ReservasDatabase } from "../database/ReservasDatabase.js"
import { validaIdMiddleware } from "../middlewares/validarId.middleware.js"
import { validaReservaMiddleware } from "../middlewares/validarReserva.middleware.js"
import { validaReservaExistenteMiddleware } from "../middlewares/validarReservaExistente.middleware.js"

const db = new ReservasDatabase()
const router = Router()

router.get("/", (req, res) => {
    const { ativa, turno, capacidadeMin } = req.query
    let reservas = db.listarTodos()
    
    if (ativa !== undefined) {
        reservas = reservas.filter(r => String(r.ativa) == ativa)
    }

    if (turno){
        reservas = reservas.filter(t => t.turno === turno)
    }

    if (capacidadeMin){
        reservas = reservas.filter(c => c.capacidadeSolicitada >= Number(capacidadeMin))
    }

    res.status(200).json(reservas)
})

router.get("/:id", validaIdMiddleware, validaReservaExistenteMiddleware, (req, res) => {
    const id = Number(req.params.id)
    const reserva = db.buscarPorId(id)

    if (!reserva){
        res.status(404).json({mensagem: "Reserva não encontrada"})
        return
    }
    
    res.status(200).json(reserva)
})

router.post("/", validaReservaMiddleware, (req, res) => {
    const reserva = req.body
    const inserir = db.inserir(reserva)

    res.status(201).json(inserir)

})

router.put("/:id", validaIdMiddleware,validaReservaExistenteMiddleware, (req, res) => {
    const { id } = req.params
    const dadosAtualizados = req.body

    db.atualizar(Number(id), dadosAtualizados)
    res.json(dadosAtualizados)
})

router.delete("/:id", validaIdMiddleware, validaReservaExistenteMiddleware, (req, res) => {
    const { id } = req.params
    
    db.remover(Number(id))
    res.status(204).send()
})

router.patch("/:id/cancelar", validaIdMiddleware, validaReservaExistenteMiddleware, (req, res) => {
    const { id } = req.params
    db.cancelar(Number(id))

    res.status(200).json()
})

router.patch("/:id/reativar",validaIdMiddleware, validaReservaExistenteMiddleware, (req, res) => {
    const { id } = req.params
    const reativado = db.reativar(id)

    res.status(200).json(reativado)
})

export default router