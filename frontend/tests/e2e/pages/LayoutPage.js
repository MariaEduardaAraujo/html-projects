export class LayoutPage {
    constructor(page) {
        this.page    = page
        this.btnSair = page.getByTestId('btn-sair')
    }

    async goto() {
        await this.page.goto('/login')
    }
}