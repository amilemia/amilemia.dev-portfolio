import { expect, test } from '@playwright/test';

test.describe('Services Page', () => {
  test('locale switching works on services page', async ({ page }) => {
    // Start on English services page
    await page.goto('/en/services', { waitUntil: 'networkidle' });
    
    // Wait for service cards to ensure page is loaded
    await expect(page.getByTestId('service-card').first()).toBeVisible({ timeout: 15000 });

    // Switch to French
    await page.getByTestId('language-toggle').click();
    await page.getByRole('menuitemradio', { name: 'Français' }).click();

    // Verify we're on French services page
    await page.waitForURL('/fr/services', { timeout: 10000 });
    await expect(page.getByTestId('service-card').first()).toBeVisible({ timeout: 15000 });

    // Switch back to English (menu items are now in French, so "English" is "Anglais")
    await page.getByTestId('language-toggle').click();
    await page.getByRole('menuitemradio', { name: 'Anglais' }).click();

    // Verify we're back on English services page
    await page.waitForURL('/en/services', { timeout: 10000 });
    await expect(page.getByTestId('service-card').first()).toBeVisible({ timeout: 15000 });
  });

  test('locale switching preserves query parameters', async ({ page }) => {
    // Navigate to services page with query parameter
    await page.goto('/en/services?utm_source=test&utm_medium=email', { waitUntil: 'networkidle' });

    // Wait for page to load
    await expect(page.getByTestId('service-card').first()).toBeVisible({ timeout: 15000 });

    // Verify query parameters are present
    expect(page.url()).toContain('utm_source=test');
    expect(page.url()).toContain('utm_medium=email');

    // Switch to French
    await page.getByTestId('language-toggle').click();
    await page.getByRole('menuitemradio', { name: 'Français' }).click();

    // Wait for navigation
    await page.waitForURL(/\/fr\/services/, { timeout: 10000 });

    // Verify query parameters are preserved
    expect(page.url()).toContain('utm_source=test');
    expect(page.url()).toContain('utm_medium=email');
    expect(page.url()).toContain('/fr/services');
  });

  test('service cards are interactive and clickable', async ({ page }) => {
    await page.goto('/en/services');

    // Wait for service cards to be visible
    const serviceCards = page.getByTestId('service-card');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });

    // Verify multiple service cards exist
    const cardCount = await serviceCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Test tier selection on first card
    const firstCard = serviceCards.first();
    
    // Find all tier buttons within the first card
    const tierButtons = firstCard.getByRole('button');
    const firstTierButton = tierButtons.first();
    
    if (await firstTierButton.isVisible()) {
      // Get initial state
      const initialState = await firstTierButton.getAttribute('aria-pressed');
      
      // Click to toggle tier
      await firstTierButton.click();
      
      // Wait a moment for state to update
      await page.waitForTimeout(100);
      
      // Verify tier state changed
      const newState = await firstTierButton.getAttribute('aria-pressed');
      expect(newState).not.toBe(initialState);
    }

    // Verify CTA button exists and is clickable
    const ctaButton = firstCard.getByRole('link');
    await expect(ctaButton).toBeVisible();
    
    // Verify CTA links to contact page
    const href = await ctaButton.getAttribute('href');
    expect(href).toContain('/contact');
  });

  test('contact form can be accessed with pre-filled service context', async ({ page }) => {
    await page.goto('/en/services');

    // Wait for service cards
    const serviceCards = page.getByTestId('service-card');
    await expect(serviceCards.first()).toBeVisible({ timeout: 10000 });

    // Click the CTA button on the first service card
    const firstCard = serviceCards.first();
    const ctaLink = firstCard.getByRole('link');
    
    // Get the href to verify it has subject parameter
    const href = await ctaLink.getAttribute('href');
    expect(href).toMatch(/\/en\/contact\?service=/);

    // Click the CTA
    await ctaLink.click();

    // Wait for navigation to contact page
    await page.waitForURL(/\/en\/contact/, { timeout: 10000 });

    // Verify we're on the contact page by checking for form elements
    await expect(page.getByTestId('name-input')).toBeVisible({ timeout: 10000 });

    // Verify URL contains subject parameter
    expect(page.url()).toContain('service=');
  });

  test('services page displays all key sections', async ({ page }) => {
    await page.goto('/en/services', { waitUntil: 'networkidle' });

    // Verify service packages section
    const serviceCards = page.getByTestId('service-card');
    await expect(serviceCards.first()).toBeVisible({ timeout: 15000 });

    // Verify multiple service cards exist
    const cardCount = await serviceCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Verify CTA buttons exist
    const ctaButtons = page.getByRole('link').filter({ hasText: /book|get started/i });
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('services page works in French locale', async ({ page }) => {
    await page.goto('/fr/services', { waitUntil: 'networkidle' });

    // Verify service cards are visible
    const serviceCards = page.getByTestId('service-card');
    await expect(serviceCards.first()).toBeVisible({ timeout: 15000 });

    // Verify language toggle shows French as current
    const languageToggle = page.getByTestId('language-toggle');
    await expect(languageToggle).toContainText('fr');

    // Verify CTA links to French contact page
    const firstCard = serviceCards.first();
    const ctaLink = firstCard.getByRole('link');
    const href = await ctaLink.getAttribute('href');
    expect(href).toContain('/fr/contact');
  });
});
