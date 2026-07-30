export const errorMiddleware = (err, req, res, next) => {
    const status = err.status ?? 500
    const mensagem = err.mensagem ?? "Erro do servidor"
    res.status(status).json({ mensagem })
}