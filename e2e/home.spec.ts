import { expect, test } from '@playwright/test';

test('home page navigates to projects', async ({ page }) => {
  await page.goto('/en', { waitUntil: 'networkidle' });

  await Promise.all([
    page.waitForURL(/\/(en\/)?projects$/, { timeout: 20000 }),
    page.getByRole('link', { name: 'See my work' }).click(),
  ]);

  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible({ timeout: 15000 });
});
