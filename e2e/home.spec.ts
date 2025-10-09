import { expect, test } from '@playwright/test';

test('home page navigates to projects', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await Promise.all([
    page.waitForURL(/\/projects$/, { timeout: 15000 }),
    page.getByRole('link', { name: 'View work' }).click(),
  ]);

  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible({ timeout: 15000 });
});
