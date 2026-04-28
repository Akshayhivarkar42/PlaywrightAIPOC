// @ts-check
import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/PlaywrightHomePage';

test('has title', async ({ page }) => {
  const homePage = new PlaywrightHomePage(page);
  await homePage.goto();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  const homePage = new PlaywrightHomePage(page);
  await homePage.goto();

  // Click the get started link.
  await homePage.clickGetStarted();

  // Expects page to have a heading with the name of Installation.
  await expect(homePage.installationHeading).toBeVisible();
});
