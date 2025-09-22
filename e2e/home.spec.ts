import { expect, test } from '@playwright/test';

test('home page navigates to projects', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'View work' }).click();
  await expect(page).toHaveURL(/\/projects$/);
});
