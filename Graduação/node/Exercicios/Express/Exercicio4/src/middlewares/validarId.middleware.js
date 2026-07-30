export const validaIdMiddleware = (req, res, next) => {
    const id = Number(req.params.id)

    if (!id){
        res.status(400).json({mensagem: "ID Inválido"})
        return
    }
    next()
}