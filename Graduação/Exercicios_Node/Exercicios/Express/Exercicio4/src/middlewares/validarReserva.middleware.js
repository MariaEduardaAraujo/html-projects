export const validaReservaMiddleware = (req, res, next) => {
    const { responsavel, laboratorio, data, turno, capacidadeSolicitada, finalidade } = req.body
    const enumTurno = ["TARDE", "NOITE", "MANHA"]

    if (!responsavel || !laboratorio || !data || !turno || 
        !capacidadeSolicitada || !finalidade){
        res.status(422).json({mensagem: "Dados inválidos para criação da reserva"})
        return
    }else if (!(Number(capacidadeSolicitada) > 0)){
        res.status(422).json({mensagem: "Capacidade inválida para a reserva"})
        return
    }else if (!(enumTurno.includes(turno.toUpperCase()))){
        res.status(422).json({mensagem: "Turno inválido para a reserva"})
        return
    }            
    next()
}