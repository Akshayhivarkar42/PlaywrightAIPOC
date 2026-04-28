// spec: specs/vwo-login-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('VWO Login Suite', () => {
  test('Empty fields show validation messages', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to https://app.vwo.com/#/login
    await loginPage.goto();

    // 2. Ensure Submit/Login button visible
    await expect(loginPage.submitButton).toBeVisible();

    // 3. Click the Submit button with empty fields
    await loginPage.clickSubmit();

    // 4. Verify validation messages are shown for required fields
    await expect(loginPage.emailValidationMessage).toBeVisible({ timeout: 5000 });
    await expect(loginPage.passwordValidationMessage).toBeVisible({ timeout: 5000 });

    await expect(page).toHaveURL(/login/);
  });
});