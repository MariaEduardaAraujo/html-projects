import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage.js'
import { EntregasPage } from './pages/EntregasPage.js'
import { LayoutPage } from './pages/LayoutPage.js'

test('tabela de entregas visível após login com, pelo menos, uma linha', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('gestor@email.com', '12345678')

    const entregasPage = new EntregasPage(page)
    await expect(entregasPage.tabelaEntregas).toBeVisible()
    
    const count = await page.locator('tbody tr').count()
    expect(count).toBeGreaterThan(0)
})
test('logout redireciona para página de login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('gestor@email.com', '12345678')

    const entregasPage = new EntregasPage(page)
    await entregasPage.layout.btnSair.click()
    await expect(page).toHaveURL(/\/login/)

    await page.goto('/entregas')
    await expect(page).toHaveURL(/\/login/)
})