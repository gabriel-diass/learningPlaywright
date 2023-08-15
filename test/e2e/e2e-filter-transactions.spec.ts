import { test, expect } from '@playwright/test'

test.describe.only('filter transactions', ()=>{
    test.beforeEach(async ({ page}) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

    })
  
    test('verify the results for each account',async ({ page}) => {
        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')
        const checkingAccount = await page.locator( '#all_transactions_for_account tbody tr')
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')
        const loanAccount = await page.locator( '#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')
        const noResults = await page.locator('.well')
        await expect(noResults).toBeVisible()
       
    })
})