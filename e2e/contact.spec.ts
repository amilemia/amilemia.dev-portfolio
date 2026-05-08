import { expect, test } from '@playwright/test';

test('contact brief pre-populates service from URL parameter', async ({ page }) => {
  await page.goto('/en/contact?service=Launch%20Essentials');
  
  // Navigate to step 2 where the goals field and project scope are
  await page.getByTestId('name-input').fill('Jane Doe');
  await page.getByTestId('email-input').fill('jane@example.com');
  await page.getByTestId('brief-next').click();
  
  // Wait for step 2 to be visible
  await expect(page.getByTestId('brief-step-23')).toHaveText('Step 2 of 3');
  
  // Verify the goals field contains the service name
  const goalsInput = page.getByTestId('message-input');
  await expect(goalsInput).toHaveValue(/Launch Essentials/);
  
  // Verify that a project scope is pre-selected
  const projectScopeGroup = page.getByRole('group', { name: 'What do you need?' });
  const launchSiteCheckbox = projectScopeGroup.getByRole('checkbox', { name: 'New Site Launch' });
  await expect(launchSiteCheckbox).toBeChecked();
});

test('contact brief validates and submits', async ({ page }) => {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/en/contact');

  // Touch fields to trigger validation styling on blur
  await page.getByTestId('name-input').focus();
  await page.getByTestId('name-input').blur();
  await page.getByTestId('email-input').focus();
  await page.getByTestId('email-input').blur();

  // Also click next to run form.trigger on the current step
  await page.getByTestId('brief-next').click();

  await expect(page.getByTestId('name-input')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByTestId('email-input')).toHaveAttribute('aria-invalid', 'true');

  await page.getByTestId('name-input').fill('Jane Doe');
  await page.getByTestId('email-input').fill('jane@example.com');
  await page.getByTestId('email-input').blur();

  await page.getByTestId('brief-next').click();

  await expect(page.getByTestId('brief-step-23')).toHaveText('Step 2 of 3');

  await page.getByTestId('brief-next').click();

  await expect(page.getByText('Select at least one option')).toBeVisible();
  await expect(page.getByTestId('message-input')).toHaveAttribute('aria-invalid', 'true');

  const projectScopeGroup = page.getByRole('group', { name: 'What do you need?' });
  await expect(projectScopeGroup).toBeVisible();

  await projectScopeGroup.getByRole('checkbox', { name: 'New Site Launch' }).check();
  await page.getByTestId('message-input').fill('Hello there, this is a valid project brief message.');

  await page.getByTestId('brief-next').click();

  await page.getByTestId('start-date-input').fill('2025-06-01');
  await page.getByLabel('Any timing constraints?').fill('We would like to launch in Q3.');

  await page.getByTestId('brief-next').click();

  await page.getByTestId('submit-button').click();

  // Verify success step is visible
  await expect(page.getByText(/brief received/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /schedule on cal.com/i })).toBeVisible();
});
