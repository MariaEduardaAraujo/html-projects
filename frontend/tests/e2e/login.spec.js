import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage.js'

test('login inválido exibe mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('errado@email.com', 'senhaerrada')

    await loginPage.alertaErro.waitFor({ state: 'visible' })
    await expect(loginPage.alertaErro).toBeVisible()
    await expect(page).not.toHaveURL('/entregas')
})

test('login válido redireciona para a página de entregas', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('gestor@email.com', '12345678')
    await expect(page).toHaveURL('/entregas')
})

test('acesso sem token redireciona para página de login', async ({ page }) => {
    await page.goto('/entregas')
    await expect(page).toHaveURL('/login')
})