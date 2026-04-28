// spec: specs/vwo-login-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('VWO Login Suite', () => {
  test('Invalid credentials displays error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to https://app.vwo.com/#/login
    await loginPage.goto();

    // 2. Ensure Email and Password input fields and Submit button are visible
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();

    // 3, 4, 5. Enter invalid credentials and click Submit
    await loginPage.login('invalid@example.com', 'wrongpass');

    // 6. Verify an error message is displayed indicating invalid credentials and user remains on login page
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 7000 });
    await expect(page).toHaveURL(/login/);
  });
});