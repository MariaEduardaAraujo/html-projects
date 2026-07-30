export class ReservasController{
    constructor(service){
        this.service = service

        this.listarTodos = this.listarTodos.bind(this)
        this.buscarPorId = this.buscarPorId.bind(this)
        this.criar       = this.criar.bind(this)
        this.atualizar   = this.atualizar.bind(this)
        this.remover     = this.remover.bind(this)
        this.cancelar    = this.cancelar.bind(this)
        this.reativar    = this.reativar.bind(this)
    }
    async listarTodos(req, res, next){
        try {
            const { ativa, capacidadeMin, turno } = req.query
            const reservas = await this.service.listarTodos({ ativa, capacidadeMin, turno })
            res.status(200).json(reservas)
        }catch(err){
            next(err)
        }
    }
    async buscarPorId(req, res, next){
        try{
            const reserva = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(reserva)
        }catch(err){
            next(err)
        }
    }
    async criar(req, res, next){
        try{
            const novaReserva = await this.service.criar(req.body)
            res.status(200).json(novaReserva)
        }catch(err){
            next(err)
        }
    }
    async atualizar(req, res, next){
        try{
            const atualizada = await this.service.atualizar(Number(req.params.id), req.body)
            res.status(200).json(atualizada)
        }catch(err){
            next(err)
        }
    }
    async remover(req, res, next){
        try{
            await this.service.buscarPorId(Number(req.params.id))
            res.status(204).send()
        }catch(err){
            next(err)
        }
    }
    async cancelar(req, res, next){
        try{
            const reserva = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(reserva)
        }catch(err){
            next(err)
        }
        
    }
    async reativar(req, res, next){
        try{
            const reserva = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(reserva)
        }catch(err){
            next(err)
        }
    }
}