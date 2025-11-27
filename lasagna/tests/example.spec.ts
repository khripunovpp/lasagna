import { test, expect } from '@playwright/test';

test('see home page', async ({ page }) => {
  await page.goto('http://localhost:4200');

  // Expect a title "to contain" a substring Lasagna or Лазанья
  await expect(page).toHaveTitle(/Lasagna|Лазанья/);
});
