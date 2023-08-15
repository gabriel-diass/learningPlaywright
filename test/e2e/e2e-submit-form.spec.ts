import { test, expect} from '@playwright/test'

test.describe('feedback form', ()=>{
    test.beforeEach(async ({ page}) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#feedback')
    })

    //reset feedback form
    test('reset feedback form',async ({ page}) => {
        await page.type('#name', 'some name')
        await page.type('#email', 'some email')
        await page.type('#subject', 'some subject')
        await page.type('#comment', 'some comment')
        await page.click("input[name='clear']")

        const nameInput = await page.locator('#name')
        const commentInput = await page.locator('#comment')
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()

    })
    //submit feedback form


})