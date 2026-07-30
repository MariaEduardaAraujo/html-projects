export class MotoristasController{
    constructor(service){
        this.service = service

        this.listarTodos = this.listarTodos.bind(this)
        this.buscarPorId = this.buscarPorId.bind(this)
        this.buscarPorCPF = this.buscarPorCPF.bind(this)
        this.criar = this.criar.bind(this)
        this.atualizar = this.atualizar.bind(this)
        this.listarEntregas = this.listarEntregas.bind(this)
    }
    async listarTodos(req, res, next){
        try {
            const motoristas = await this.service.listarTodos()
            res.status(200).json(motoristas)
        } catch (err) {
            next(err)
        }
    }
    async listarEntregas(req, res, next){
        try {
            const entregas = await this.service.listarEntregas(Number(req.params.id), req.query)
            res.status(200).json(entregas)
        } catch (err) {
            next(err)
        }
    }
    async buscarPorId(req, res, next){
        try{
            const motoristas = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(motoristas)
        }catch (err){
            next(err)
        }
    }
    async buscarPorCPF(req, res, next){
        try{
            const motoristas = await this.service.buscarPorCPF(req.params.cpf)
            res.status(200).json(motoristas)
        }catch (err){
            next(err)
        }
    }
    async criar(req, res, next){
        try {
            const novoMotorista = await this.service.criar(req.body)
            res.status(201).json(novoMotorista)
        } catch (err) {
            next(err)
        }
    }
    async atualizar(req, res, next){
        try {
            const motorista = await this.service.atualizar(Number(req.params.id), req.body)
            res.status(200).json(motorista)
        } catch (err) {
            next(err)
        }
    }
}
