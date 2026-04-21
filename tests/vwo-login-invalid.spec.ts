// spec: specs/vwo-login-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('VWO Login Suite', () => {
  test('Invalid credentials displays error', async ({ page }) => {
    // 1. Navigate to https://app.vwo.com/#/login
    await page.goto('https://app.vwo.com/#/login');

    // 2. Ensure Email and Password input fields and Submit button are visible
    const email = page.locator('input[type="email"], input[name="email"], input[placeholder*="Email" i]');
    const password = page.locator('input[type="password"], input[name="password"], input[placeholder*="Password" i]');
    const submit = page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Log In"), button:has-text("Sign in"), button:has-text("Sign In")');

    await expect(email.first()).toBeVisible();
    await expect(password.first()).toBeVisible();
    await expect(submit.first()).toBeVisible();

    // 3. Enter invalid email invalid@example.com into the Email field
    await email.first().fill('invalid@example.com');

    // 4. Enter invalid password wrongpass into the Password field
    await password.first().fill('wrongpass');

    // 5. Click the Submit button
    await submit.first().click();

    // 6. Verify an error message is displayed indicating invalid credentials and user remains on login page
    const error = page.locator('text=/invalid|incorrect|wrong|email or password|credentials/i');
    await expect(error.first()).toBeVisible({ timeout: 7000 });
    await expect(page).toHaveURL(/login/);
  });
});