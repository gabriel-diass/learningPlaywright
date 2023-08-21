import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  // define selectors
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly loginForm: Locator;

  //init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user_login");
    this.passwordInput = page.locator("#user_password");
    this.submitButton = page.locator("text=Sign in");
    this.errorMessage = page.locator(".alert-error");
    this.loginForm = page.locator("#login_form");
  }
  //define login page methods


  async login(username: string, password: string) {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
    await this.submitButton.click();
    await this.page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

  }
  async loginNegative(username: string, password: string) {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
    await this.submitButton.click();

  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText(
      "Login and/or password are wrong"
    );
  }

  async snapshotLoginForm(){
    await expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
  }

  async snapshotErrorForm(){
    await expect(await this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
  }
}
