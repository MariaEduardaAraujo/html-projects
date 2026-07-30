const enumTurno = ["manha", "tarde", "noite"]

export const validaReservaMiddleware = (req, res, next) => {
    const { responsavel, laboratorio, data, turno, capacidadeSolicitada, finalidade } = req.body

    if (!responsavel || !laboratorio || !data || !turno || 
        !capacidadeSolicitada || !finalidade){
        res.status(422).json({mensagem: "Dados inválidos para criação da reserva"})
        return
    }else if (!(Number(capacidadeSolicitada) > 0)){
        res.status(422).json({mensagem: "Capacidade inválida para a reserva"})
        return
    }else if (!(enumTurno.includes(turno))){
        res.status(422).json({mensagem: "Turno inválido para a reserva"})
        return
    }            
    next()
}