export class EstoqueController{
    constructor(service){
        this.service = service

        this.listar = this.listar.bind(this)
        this.buscarPorId = this.buscarPorId.bind(this)
        this.criar = this.criar.bind(this)
        this.atualizarQuantidade = this.atualizarQuantidade.bind(this)
        this.darBaixa = this.darBaixa.bind(this)
    }
    async listar(req, res, next){
        try {
            const { disponivel, autor } = req.query
            const estoque = await this.service.listar({ disponivel, autor })
            res.status(200).json(estoque)
        } catch (err) {
            next(err)
        }
    }
    async buscarPorId(req, res, next){
        try {
            const estoque = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(estoque)
        } catch (err) {
            next(err)
        }
    }
    async criar(req, res, next){
        try {
            const estoque = await this.service.criar(req.body)
            res.status(201).json(estoque)
        } catch (error) {
            next(err)
        }
    }
    async atualizarQuantidade(req, res, next){
        try {
            const estoque = await this.service.atualizarQuantidade(Number(req.params.id), req.body)
            res.status(200).json(estoque)
        } catch (error) {
            next(err)
        }
    }
    async darBaixa(req, res, next){
        try {
            const estoque = await this.service.darBaixa(Number(req.params.id))
            res.status(200).json(estoque)        
        } catch (error) {
            next(err)
        }
    }
}