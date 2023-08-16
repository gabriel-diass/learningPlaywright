import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe.only("login / logout flow", () => {
  let loginPage: LoginPage;
  //before hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  });
  //Negative scenario
  test("negative scenario for login", async ({ page }) => {
    await page.click("#signin_button");
    await loginPage.login("invalid username", "invalid password");
    await loginPage.assertErrorMessage();
  });
  //positive scenario + logout
  test("positive scenario for login / logout", async ({ page }) => {
    await page.click("#signin_button");
    await loginPage.login("username", "password");
    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");

    const accountSummaryTab = await page.locator("#account_summary_tab");
    await expect(accountSummaryTab).toBeVisible();

    await page.goto("http://zero.webappsecurity.com/logout.html");
    await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html");
  });
});
