import {LayoutPage } from './LayoutPage.js'

export class EntregasPage {
    constructor(page) {
        this.page          = page
        this.tabelaEntregas = page.getByTestId('tabela-entregas')
        this.layout = new LayoutPage(page)
    }

    async goto() {
        await this.page.goto('/entregas')
    }
}