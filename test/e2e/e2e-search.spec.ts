import { test, expect } from '@playwright/test'

test.describe('search results', ()=>{
    test('should find searh results',async ({ page}) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.type('#searchTerm', 'bank')
        await page.keyboard.press('Enter')

        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2)
    })
})