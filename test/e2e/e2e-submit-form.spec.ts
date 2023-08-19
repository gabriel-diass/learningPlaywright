import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { FeedbackPage } from "../../page-objects/FeedbackPage";

test.describe("feedback form", () => {
  let homePage: HomePage;
  let feedbackPage: FeedbackPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    feedbackPage = new FeedbackPage(page);
    await homePage.visit();
    await homePage.clickOnFeedbackLink();
  });

  //reset feedback form
  test("reset feedback form", async ({ page }) => {
    await feedbackPage.fillForm("name", "email", "subject", "message");
    await feedbackPage.clearForm();
    await feedbackPage.assertReset();
  });
  //submit feedback form
  test("submit feedback form", async ({ page }) => {
    await feedbackPage.fillForm("name", "email", "subject", "message");
    await feedbackPage.feedbackFormSent();
  });
});