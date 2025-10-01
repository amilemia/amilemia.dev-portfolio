import { expect, test } from '@playwright/test';

test('contact brief validates and submits', async ({ page }) => {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/contact');

  await page.getByTestId('brief-next').click();

  await expect(page.getByTestId('name-input')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByTestId('email-input')).toHaveAttribute('aria-invalid', 'true');

  await page.getByTestId('name-input').fill('Jane Doe');
  await page.getByTestId('email-input').fill('jane@example.com');
  await page.getByTestId('email-input').blur();

  await page.getByTestId('brief-next').click();

  await expect(page.getByTestId('brief-step-13')).toHaveText('Step 2 of 3');

  await page.getByTestId('brief-next').click();

  await expect(page.getByText('Select at least one project scope')).toBeVisible();
  await expect(page.getByTestId('message-input')).toHaveAttribute('aria-invalid', 'true');

  const projectScopeGroup = page.getByRole('group', { name: 'Project scope' });
  await expect(projectScopeGroup).toBeVisible();

  await projectScopeGroup.getByRole('checkbox', { name: 'Portfolio site' }).check();
  await page.getByTestId('message-input').fill('Hello there, this is a valid project brief message.');

  await page.getByTestId('brief-next').click();

  await page.getByTestId('start-date-input').fill('2025-06-01');
  await page.getByLabel('Timing notes').fill('We would like to launch in Q3.');

  await page.getByTestId('brief-next').click();

  await page.getByTestId('submit-button').click();

  const toast = page.getByRole('region', { name: 'Notifications alt+T' }).getByText('Brief sent!');
  await expect(toast).toBeVisible();
});
