import { expect, test } from '@playwright/test';

test.describe('theme toggle', () => {
  test('applies selection, persists, and respects system preference', async ({ page }) => {
    await page.goto('/');

    const htmlHasDark = () => page.evaluate(() => document.documentElement.classList.contains('dark'));

    // Enable dark mode and ensure the html element reflects it.
    await page.getByTestId('theme-toggle').click();
    await page.getByTestId('theme-dark').click();
    await expect.poll(htmlHasDark).toBeTruthy();

    // Selection should persist after reload.
    await page.reload();
    await expect.poll(htmlHasDark).toBeTruthy();

    // Switch to system preference and simulate OS changes.
    await page.getByTestId('theme-toggle').click();
    await page.getByTestId('theme-system').click();

    await page.emulateMedia({ colorScheme: 'light' });
    await expect.poll(htmlHasDark).toBeFalsy();

    await page.emulateMedia({ colorScheme: 'dark' });
    await expect.poll(htmlHasDark).toBeTruthy();

    await page.emulateMedia({ colorScheme: null });
  });
});
