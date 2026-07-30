export class AppError{
    constructor(mensagem, status = 400){
        this.mensagem = mensagem
        this.status = status
    }
}