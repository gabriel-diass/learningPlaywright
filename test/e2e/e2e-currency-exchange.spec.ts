import { test, expect } from "@playwright/test";

test.describe("currency exchange", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/");
    await page.click("#signin_button");
    await page.type("#user_login", "username");
    await page.type("#user_password", "password");
    await page.click("text=Sign in");
    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");
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
