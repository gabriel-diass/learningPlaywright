import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe("currency exchange", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    homePage.visit();
    homePage.clickOnSignIn();
    loginPage.login("username", "password");
  });

  test("exchange currency", async ({ page }) => {
    await page.click("#pay_bills_tab");
    await page.click("text=Purchase Foreign Currency");
    await page.selectOption("#pc_currency", "AUD");

    const message = page.locator(".help-block > span");
    await expect(message).toBeVisible();
    await expect(message).toContainText("=");
    await page.type("#pc_amount", "500");
    await page.click("#pc_inDollars_true");
    await page.click("#pc_calculate_costs");

    await page.waitForSelector("#pc_conversion_amount");

    await page.click("#purchase_cash");

    const alertMessage = page.locator("#alert_content");
    await expect(alertMessage).toContainText(
      "Foreign currency cash was successfully purchased."
    );
  });
});
