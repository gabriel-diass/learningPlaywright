import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe("login / logout flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  //before hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.visit();
  });
  //Negative scenario
  test("negative scenario for login", async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.loginNegative("invalid username", "invalid password");
    await loginPage.assertErrorMessage();
  });
  //positive scenario + logout
  test("positive scenario for login / logout", async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login("username", "password");

    const accountSummaryTab = await page.locator("#account_summary_tab");
    await expect(accountSummaryTab).toBeVisible();

    await page.goto("http://zero.webappsecurity.com/logout.html");
    await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html");
  });
});
