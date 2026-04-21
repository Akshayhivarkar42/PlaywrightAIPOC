// spec: specs/vwo-login-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('VWO Login Suite', () => {
  test('Empty fields show validation messages', async ({ page }) => {
    // 1. Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // 2. Ensure Submit/Login button visible
    const submit = page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Log In"), button:has-text("Sign in"), button:has-text("Sign In")');
    await expect(submit.first()).toBeVisible();

    // 3. Click the Submit button with empty fields
    await submit.first().click();

    // 4. Verify validation messages are shown for required fields
    const emailValidation = page.locator('text=/required|enter.*email|email is required|please enter your email/i');
    const passwordValidation = page.locator('text=/required|enter.*password|password is required|please enter your password/i');

    await expect(emailValidation.first()).toBeVisible({ timeout: 5000 });
    await expect(passwordValidation.first()).toBeVisible({ timeout: 5000 });

    await expect(page).toHaveURL(/login/);
  });
});