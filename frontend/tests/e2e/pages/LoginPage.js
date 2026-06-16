export class LoginPage {
    constructor(page) {
        this.page = page
        this.inputEmail = page.getByTestId('input-email')
        this.inputSenha = page.getByTestId('input-senha')
        this.btnLogin   = page.getByTestId('btn-login')
        this.alertaErro = page.getByTestId('alerta-erro')
    }

    async goto() {
        await this.page.goto('/login')
    }

    async login(email, senha) {
        await this.inputEmail.fill(email)
        await this.inputSenha.fill(senha)
        await this.btnLogin.click()
    }
}