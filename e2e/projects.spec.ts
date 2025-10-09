import { expect, test } from '@playwright/test';

test('projects page shows project details when card is clicked', async ({ page }) => {
  await page.goto('/projects');

  const firstCard = page.getByTestId('project-card').first();
  await expect(firstCard).toBeVisible();
  const projectLink = firstCard.getByRole('link').first();
  const projectTitle = (await projectLink.textContent())?.trim();
  const projectHref = await projectLink.getAttribute('href');

  await Promise.all([
    page.waitForURL((url) => url.pathname !== '/projects', { timeout: 30000 }),
    projectLink.click(),
  ]);

  if (projectHref) {
    await expect(page).toHaveURL(new RegExp(`${projectHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), {
      timeout: 30000,
    });
  } else {
    await expect(page).toHaveURL(/\/projects\/.+/, { timeout: 30000 });
  }

  if (projectTitle) {
    await expect(
      page.getByRole('heading', { name: projectTitle, level: 1 }).first()
    ).toBeVisible({ timeout: 30000 });
  } else {
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 30000 });
  }
});
