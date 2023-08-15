import { test, expect} from '@playwright/test'

test('Simple basic test', async({page})  => {
    //here goes the test code
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect (pageTitle).toContainText( 'Example Domain')
})


test.describe.only('My first test suite', () => { 
test('Clickin on Elements',async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator( '.alert-error')
    await expect(errorMessage).toContainText( 'Login and/or password are wrong.')
    

})

 test.skip('Selectors', async ({page}) => {
    //text
    await page.click('text=some text')
    //CSS Selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')
    //only visible css selector
    await page.click('.submit-button:visible')
    //combinations
    await page.click('#username .first')
    //xpath
    await page.click('//button')
})

test( "working with inputs",async ({ page}) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login','some username')
    await page.type('#user_password','some username')
    await page.click('text=Sign in')

    const errorMessage = await page.locator( '.alert-error')
    await expect(errorMessage).toContainText( 'Login and/or password are wrong.')

})

//npx playwright test --grep @myTag
//npx playwright test --grep-invert @myTag

test('assertions @myTag',async ({ page}) => {
    await page.goto('https://www.example.com')
    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()


})
})

test('screenshots',async ({ page}) => {
    await page.goto('https://www.example.com')
    await page.screenshot({ path: 'screenshot.png', fullPage: true})
    
})


test.only('single element screenshot',async ({ page}) => {
    await page.goto('https://www.example.com')
    const element = await page.$('h1')
    await element.screenshot({ path: 'singleElementScreenshot.png'})
    
})