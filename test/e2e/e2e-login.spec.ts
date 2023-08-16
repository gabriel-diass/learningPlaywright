import { test, expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.only('login / logout flow', () => {
    let loginPage: LoginPage
    //before hook
    test.beforeEach(async ({ page}) => {
        loginPage = new LoginPage(page)
        await loginPage.visit()
        // await page.goto('http://zero.webappsecurity.com/')
    })
    //Negative scenario
    test('negative scenario for login',async ({page}) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'invalid username')
        await page.type('#user_password', 'invalid password')
        await page.click('text=Sign in')

            const errorMessage = await page.locator( '.alert-error')
            await expect( errorMessage).toContainText( 'Login and/or password are wrong')
    })
    //positive scenario + logout
    test('positive scenario for login / logout',async ({page}) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSummaryTab = await page.locator( '#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL( 'http://zero.webappsecurity.com/index.html')

    })
})