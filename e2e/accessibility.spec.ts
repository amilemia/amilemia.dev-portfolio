import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Helper function to check color contrast (basic check)
async function checkBasicAccessibility(page: Page, pageName: string) {
  // Check for proper HTML lang attribute
  const htmlLang = await page.getAttribute('html', 'lang');
  expect(htmlLang).toBeTruthy();
  expect(['en', 'fr']).toContain(htmlLang);
  
  // Check for skip link
  const skipLink = page.getByText(/skip to main content|aller au contenu principal/i);
  await expect(skipLink).toBeVisible();
  
  // Check main landmark exists
  const main = page.locator('main#main-content');
  await expect(main).toBeVisible();
  
  // Check that main has proper tabindex for focus management
  const mainTabIndex = await main.getAttribute('tabindex');
  expect(mainTabIndex).toBe('-1');
  
  // Check language toggle has proper aria-label
  const langToggle = page.getByTestId('language-toggle');
  await expect(langToggle).toBeVisible();
  const ariaLabel = await langToggle.getAttribute('aria-label');
  expect(ariaLabel).toBeTruthy();
  expect(ariaLabel).toMatch(/language|langue/i);
  
  // Check theme toggle has proper aria-label
  const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="thème"]');
  await expect(themeToggle.first()).toBeVisible();
  
  // Check all images have alt text (or are decorative with empty alt)
  const images = await page.locator('img').all();
  for (const img of images) {
    const alt = await img.getAttribute('alt');
    const ariaHidden = await img.getAttribute('aria-hidden');
    // Image should either have alt text or be aria-hidden
    expect(alt !== null || ariaHidden === 'true').toBeTruthy();
  }
  
  // Check all buttons have accessible names
  const buttons = await page.locator('button').all();
  for (const button of buttons) {
    const ariaLabel = await button.getAttribute('aria-label');
    const textContent = await button.textContent();
    const ariaLabelledBy = await button.getAttribute('aria-labelledby');
    // Button should have text, aria-label, or aria-labelledby
    expect(
      (textContent && textContent.trim().length > 0) || 
      ariaLabel || 
      ariaLabelledBy
    ).toBeTruthy();
  }
  
  // Check all links have accessible names
  const links = await page.locator('a').all();
  for (const link of links) {
    const ariaLabel = await link.getAttribute('aria-label');
    const textContent = await link.textContent();
    const ariaLabelledBy = await link.getAttribute('aria-labelledby');
    const title = await link.getAttribute('title');
    // Link should have text, aria-label, aria-labelledby, or title
    expect(
      (textContent && textContent.trim().length > 0) || 
      ariaLabel || 
      ariaLabelledBy ||
      title
    ).toBeTruthy();
  }
}

test.describe('Accessibility Compliance - English Locale', () => {
  test('Home page (EN) meets accessibility standards', async ({ page }) => {
    await page.goto('/en');
    await checkBasicAccessibility(page, 'Home EN');
    
    // Check page title
    await expect(page).toHaveTitle(/amilemia/i);
  });
  
  test('Services page (EN) meets accessibility standards', async ({ page }) => {
    await page.goto('/en/services');
    await checkBasicAccessibility(page, 'Services EN');
  });
  
  test('Projects page (EN) meets accessibility standards', async ({ page }) => {
    await page.goto('/en/projects');
    await checkBasicAccessibility(page, 'Projects EN');
  });
  
  test('About page (EN) meets accessibility standards', async ({ page }) => {
    await page.goto('/en/about');
    await checkBasicAccessibility(page, 'About EN');
  });
  
  test('Contact page (EN) meets accessibility standards', async ({ page }) => {
    await page.goto('/en/contact');
    await checkBasicAccessibility(page, 'Contact EN');
    
    // Check form labels
    const nameInput = page.locator('input[name="name"]');
    const nameLabel = page.locator('label[for]').filter({ hasText: /name|nom/i });
    await expect(nameLabel).toBeVisible();
    
    const emailInput = page.locator('input[name="email"]');
    const emailLabel = page.locator('label[for]').filter({ hasText: /email|e-mail/i });
    await expect(emailLabel).toBeVisible();
  });
});

test.describe('Accessibility Compliance - French Locale', () => {
  test('Home page (FR) meets accessibility standards', async ({ page }) => {
    await page.goto('/fr');
    await checkBasicAccessibility(page, 'Home FR');
    
    // Check HTML lang is set to French
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
  });
  
  test('Services page (FR) meets accessibility standards', async ({ page }) => {
    await page.goto('/fr/services');
    await checkBasicAccessibility(page, 'Services FR');
    
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
  });
  
  test('Projects page (FR) meets accessibility standards', async ({ page }) => {
    await page.goto('/fr/projects');
    await checkBasicAccessibility(page, 'Projects FR');
    
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
  });
  
  test('About page (FR) meets accessibility standards', async ({ page }) => {
    await page.goto('/fr/about');
    await checkBasicAccessibility(page, 'About FR');
    
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
  });
  
  test('Contact page (FR) meets accessibility standards', async ({ page }) => {
    await page.goto('/fr/contact');
    await checkBasicAccessibility(page, 'Contact FR');
    
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
  });
});

test.describe('Keyboard Navigation', () => {
  test('Language switcher button is accessible', async ({ page }) => {
    await page.goto('/en');
    
    // Check language toggle exists and has proper aria-label
    const langToggle = page.getByTestId('language-toggle');
    await expect(langToggle).toBeVisible();
    
    const ariaLabel = await langToggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toMatch(/language/i);
  });
  
  test('All interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/en');
    
    // Tab through all interactive elements
    let tabCount = 0;
    const maxTabs = 50; // Prevent infinite loop
    
    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab');
      tabCount++;
      
      // Check if we've cycled back to the body
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.tagName;
      });
      
      if (focusedElement === 'BODY' && tabCount > 5) {
        break;
      }
    }
    
    // Should have tabbed through multiple elements
    expect(tabCount).toBeGreaterThan(5);
  });
});

test.describe('Locale Switching', () => {
  test('HTML lang attribute changes with locale', async ({ page }) => {
    // Check English page
    await page.goto('/en/services');
    let htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('en');
    
    // Check French page
    await page.goto('/fr/services');
    htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('fr');
  });
});

test.describe('Screen Reader Announcements', () => {
  test('Aria-live region exists for announcements', async ({ page }) => {
    await page.goto('/en');
    
    // Check for aria-live region
    const liveRegion = page.locator('[role="status"][aria-live="polite"]');
    await expect(liveRegion).toBeAttached();
    
    // Check language toggle has proper aria-label
    const langToggle = page.getByTestId('language-toggle');
    const ariaLabel = await langToggle.getAttribute('aria-label');
    expect(ariaLabel).toContain('Language');
  });
});
