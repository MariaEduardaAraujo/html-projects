import { ReservasDatabase } from "../database/ReservasDatabase.js"

export const validaReservaExistenteMiddleware = (req, res, next) =>{
    const id = Number(req.params.id)
    const db = new ReservasDatabase()

    const verifica = db.buscarPorId(id)
    if (!verifica){
        res.status(404).json({mensagem: "Reserva não encontrada"})
        return
    }
    next()
}