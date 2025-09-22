import { expect, test } from '@playwright/test';

test('projects page shows project details when card is clicked', async ({ page }) => {
  await page.goto('/projects');

  const firstCard = page.getByTestId('project-card').first();
  await expect(firstCard).toBeVisible();
  await firstCard.getByRole('link').first().click();

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
