import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly emailValidationMessage: Locator;
  readonly passwordValidationMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="Email" i]').first();
    this.passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="Password" i]').first();
    this.submitButton = page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Log In"), button:has-text("Sign in"), button:has-text("Sign In")').first();
    this.emailValidationMessage = page.locator('text=/required|enter.*email|email is required|please enter your email/i').first();
    this.passwordValidationMessage = page.locator('text=/required|enter.*password|password is required|please enter your password/i').first();
    this.errorMessage = page.locator('text=/invalid|incorrect|wrong|email or password|credentials/i').first();
  }

  async goto() {
    await this.page.goto('https://app.vwo.com/#/login');
  }

  async login(email?: string, password?: string) {
    if (email) {
      await this.emailInput.fill(email);
    }
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.clickSubmit();
  }

  async clickSubmit() {
    await this.submitButton.click();
  }
}
