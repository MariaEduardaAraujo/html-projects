export class AppError{
    constructor(mensagem, status = 400){
        this.status = status
        this.mensagem = mensagem
    }
}