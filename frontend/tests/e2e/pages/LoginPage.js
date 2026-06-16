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
        await this.inputEmail.clear()
        await this.inputSenha.clear()

        await this.inputEmail.pressSequentially(email, { delay: 50 })
        await this.inputSenha.pressSequentially(senha, { delay: 50 })
        
        await this.btnLogin.click()
    }
}