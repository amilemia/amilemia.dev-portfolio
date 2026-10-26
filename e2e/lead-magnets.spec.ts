import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Keep browser checks independent of production email and subscriber services.
  await page.route('**/api/lead-magnets/capture', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: { counts: {} } });
      return;
    }
    const { leadMagnetSlug } = route.request().postDataJSON();
    await route.fulfill({
      json: { success: true, downloadCount: 1, downloadUrl: `/resources/${leadMagnetSlug}.pdf` },
    });
  });
});

test('resources expose honest contents, usable previews and matching downloads', async ({ page }) => {
  await page.goto('/en/resources');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('practical next step');
  await expect(page.getByText('Fillable PDF · English', { exact: true })).toHaveCount(3);
  await expect(page.getByRole('link', { name: /^Preview a page:/ })).toHaveCount(3);

  for (const slug of ['conversion-optimization-guide', 'nextjs-best-practices', 'web-performance-checklist']) {
    const preview = page.locator(`a[href="/images/lead-magnets/${slug}-preview.jpg"]`);
    const imageResponse = await page.request.get(await preview.getAttribute('href') as string);
    expect(imageResponse.status()).toBe(200);
    expect(imageResponse.headers()['content-type']).toContain('image/jpeg');
    const card = preview.locator('xpath=../..');
    await card.getByRole('button', { name: /^Email me the free PDF:/ }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel('Name', { exact: true }).fill('Portfolio Reader');
    await dialog.getByLabel('Email', { exact: true }).fill('reader@example.com');
    const capture = page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/api/lead-magnets/capture'));
    await dialog.getByRole('button', { name: 'Send Me the Resource' }).click();
    expect((await capture).postDataJSON().leadMagnetSlug).toBe(slug);
    await expect(dialog.getByRole('link', { name: 'Download PDF Now' })).toHaveAttribute('href', `/resources/${slug}.pdf`);
    await dialog.getByRole('button', { name: 'Close', exact: true }).click();
    const pdf = await page.request.get(`/resources/${slug}.pdf`);
    expect(pdf.status()).toBe(200);
    expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  }
});

test('homepage leads visitors to the complete resource library', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { name: 'Get the Conversion Optimization Guide' })).toBeVisible();
  await page.getByRole('link', { name: 'Explore all 3 resources' }).click();
  await expect(page).toHaveURL(/\/en\/resources$/);
});

test('resource navigation fits mobile and French visitors can find the English PDFs', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/resources');
  await expect(page.getByText('PDF remplissable · Anglais', { exact: true })).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await expect(page.getByRole('link', { name: 'Ressources', exact: true })).toBeVisible();
});
