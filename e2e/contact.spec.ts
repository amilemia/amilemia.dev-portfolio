import { expect, test } from '@playwright/test';

test('contact form validates and submits', async ({ page }) => {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/contact');

  await page.getByTestId('submit-button').click();

  await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  await expect(page.getByText('Message must be at least 10 characters')).toBeVisible();

  await page.getByTestId('name-input').fill('Jane Doe');
  await page.getByTestId('email-input').fill('jane@example.com');
  await page.getByTestId('message-input').fill('Hello there, this is a valid contact message.');

  await page.getByTestId('submit-button').click();

  const toast = page.getByRole('region', { name: 'Notifications alt+T' }).getByText('Message sent!');
  await expect(toast).toBeVisible();
});
