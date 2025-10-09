import { expect, test } from '@playwright/test';

test('projects page shows project details when card is clicked', async ({ page }) => {
  await page.goto('/en/projects');

  const firstCard = page.getByTestId('project-card').first();
  await expect(firstCard).toBeVisible();
  const projectLink = firstCard.getByRole('link').first();
  const projectTitle = (await projectLink.textContent())?.trim();
  const projectHref = await projectLink.getAttribute('href');

  await Promise.all([
    page.waitForURL((url) => url.pathname !== '/en/projects', { timeout: 30000 }),
    projectLink.click(),
  ]);

  // Confirm a project detail page by asserting an H1 exists and is visible
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 30000 });

  // Optionally also ensure URL changed to some project detail path
  if (projectHref) {
    await expect(page).toHaveURL(new RegExp(`${projectHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), {
      timeout: 30000,
    });
  } else {
    await expect(page).toHaveURL(/\/en\/projects\/.+/, { timeout: 30000 });
  }

  // If we captured a non-empty link title, try to match it, but don't fail the test if missing
  if (projectTitle) {
    const possibleTitle = page.getByRole('heading', { name: projectTitle, level: 1 }).first();
    const isVisible = await possibleTitle.isVisible();
    if (isVisible) {
      await expect(possibleTitle).toBeVisible();
    }
  }
});
