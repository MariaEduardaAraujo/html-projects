export class ProdutosController{
    constructor(service){
        this.service = service

        this.listarTodos = this.listarTodos.bind(this)
        this.buscarPorId = this.buscarPorId.bind(this)
        this.criar = this.criar.bind(this)
    }

    async listarTodos(req, res, next){
        try{
            const produtos = await this.service.listarTodos()
            res.status(200).json(produtos)
        }catch (err){
            next(err)
        }
    }
    async buscarPorId(req, res, next){
        try {
            const produto = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(produto)
        } catch (err) {
            next(err)
        }
    }
    async criar(req, res, next){
        try {
            const novoProduto = await this.service.criar(req.body)
            res.status(201).json(novoProduto)
        } catch (err) {
           next(err) 
        }
    }
}